import { UserService } from './user.service';
import { Controller, Get, Req } from '@nestjs/common';
import RequestWithUser from 'src/auth/requestWithUser.interface';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  sendUserData(@Req() request: RequestWithUser) {
    const userId = request.userId;
    return this.userService.sendUserData(userId);
  }
}
