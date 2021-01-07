import { UserEntity } from './../user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { userWithTokens } from './local.strategy';
import { CreateUserDto } from './../user/dto/user.dto';
import { UserService } from './../user/user.service';
import { forwardRef, HttpException, HttpStatus, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { createTokens } from 'src/utils/generateToken';
import { Repository } from 'typeorm';
export class AuthenticationService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @InjectRepository(UserEntity)
    private Users: Repository<UserEntity>,
  ) {}

  public async register(registrationData: CreateUserDto) {
    const userFound = await this.Users.findOne({
      where: [
        { email: registrationData.email },
        { username: registrationData.username },
      ],
    });
    if (userFound)
      return new HttpException(
        'User with same username or email already exists!',
        HttpStatus.BAD_REQUEST,
      );
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.userService.createUser({
        ...registrationData,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return { ...createdUser, ...createTokens(createdUser) };
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAuthenticatedUser(
    email: string,
    hashedPassword: string,
  ): Promise<userWithTokens> {
    try {
      const user = await this.userService.getByEmail(email);
      const isPasswordMatching = await bcrypt.compare(
        hashedPassword,
        user.password,
      );
      if (!isPasswordMatching) {
        throw new HttpException(
          'Wrong credentials provided',
          HttpStatus.BAD_REQUEST,
        );
      }
      user.password = undefined;
      const userData = await this.userService.sendUserData(user.id);
      return {
        ...userData,
        ...createTokens(user),
      };
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
