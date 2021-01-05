import { TokenService } from './token.service';
import { Controller, Get, Req } from '@nestjs/common';
import RequestWithUser from 'src/auth/requestWithUser.interface';

@Controller('token')
export class TokenController {
  constructor(private readonly TokenService: TokenService) {}

  @Get()
  sendToken(@Req() request: RequestWithUser) {
    const userId = request.userId;
    return this.TokenService.sendNewTokens(userId);
  }
}
