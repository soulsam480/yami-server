import { UpdateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { Body, Controller, Get, Patch, Req } from '@nestjs/common';
import RequestWithUser from 'src/auth/requestWithUser.interface';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  sendUserData(@Req() request: RequestWithUser) {
    const userId = request.userId;
    return this.userService.sendUserData(userId);
  }

  @Patch()
  updateUserData(
    @Req() request: RequestWithUser,
    @Body() updateUserBody: UpdateUserDto,
  ) {
    const { userId } = request;
    return this.userService.updateUser(userId, updateUserBody);
  }
}
