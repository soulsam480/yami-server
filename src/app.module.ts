import { AuthenticationModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthenticationModule,
  ],
})
export class AppModule {}
