"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserRepository_1 = require("../repositories/UserRepository");
class AuthController {
    constructor() {
        this.userRepository = new UserRepository_1.UserRepository();
    }
    async signup(req, res) {
        const { name, email, password } = req.body;
        const existingUser = await this.userRepository.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await this.userRepository.createUser(name, email, hashedPassword);
        const token = jsonwebtoken_1.default.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        return res.status(201).json({
            id: user.id,
            name: user.name,
            token: `Bearer ${token}`,
        });
    }
    async signin(req, res) {
        const { email, password } = req.body;
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        return res.status(200).json({
            id: user.id,
            name: user.name,
            token: `Bearer ${token}`,
        });
    }
}
exports.default = new AuthController();
//# sourceMappingURL=AuthController.js.map