import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupDTO {
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @MinLength(6)
  password!: string;
}

export class SigninDTO {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @MinLength(6)
  password!: string;
}
