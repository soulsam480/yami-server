import { OrderEntity } from './../orders/entities/order.entity';
import { UserService } from './../user/user.service';
import { UserEntity } from './../user/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthenticationService } from './auth.service';
import { AuthenticationController } from './auth.controller';

@Module({
  imports: [
    UserModule,
    PassportModule,
    TypeOrmModule.forFeature([UserEntity, OrderEntity]),
  ],
  providers: [AuthenticationService, LocalStrategy, UserService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
