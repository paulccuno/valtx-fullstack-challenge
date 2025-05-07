import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUserDto } from '../dto/register-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { IUserRepository } from '../domain/repositories/user.repository';
import { User } from '../domain/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: IUserRepository,
  ) {}

  async signJWT(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    const { email, password } = registerUserDto;

    const user = await this.userRepository.getUserByEmail(email);

    if (user)
      throw new HttpException(`User alredy exists`, HttpStatus.BAD_REQUEST);

    const newUser = new User({
      email,
      password: bcrypt.hashSync(password, 10),
    });

    const record = await this.userRepository.createUser(newUser);

    const { password: _, createdAt, ...rest } = record;

    return { user: rest, token: await this.signJWT(rest) };
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.getUserByEmail(email);

    if (!user)
      throw new HttpException(
        `Email/Password not valid`,
        HttpStatus.BAD_REQUEST,
      );

    console.log({ password, record: user.password });

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    console.log({ isPasswordValid });

    if (!isPasswordValid)
      throw new HttpException(
        `Email/Password not valid`,
        HttpStatus.BAD_REQUEST,
      );

    const { password: _, createdAt, ...rest } = user;

    return {
      user: rest,
      token: await this.signJWT(rest),
    };
  }
}
