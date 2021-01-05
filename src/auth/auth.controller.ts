import { CreateUserDto } from './../user/dto/user.dto';
import { LocalAuthenticationGuard } from './localAuth.guard';
import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthenticationService } from './auth.service';
import RequestWithUser from './requestWithUser.interface';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() registrationData: CreateUserDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async logIn(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
