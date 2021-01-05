import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthenticationService } from './auth.service';
import { AuthenticationController } from './auth.controller';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthenticationService, LocalStrategy],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
