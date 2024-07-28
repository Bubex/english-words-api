import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { UserRepository } from '../repositories/UserRepository';

class AuthController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async signup(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const existingUser = await this.userRepository.findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.createUser(
      name,
      email,
      hashedPassword,
    );

    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET!,
      {
        expiresIn: '1h',
      },
    );

    return res.status(201).json({
      id: user.id,
      name: user.name,
      token: `Bearer ${token}`,
    });
  }

  async signin(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET!,
      {
        expiresIn: '1h',
      },
    );

    return res.status(200).json({
      id: user.id,
      name: user.name,
      token: `Bearer ${token}`,
    });
  }
}

export default new AuthController();
