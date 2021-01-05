import { IsAuthTokenMiddleware } from './isAuthToken.middleware';
import { AuthenticationModule } from './auth/auth.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { TokenModule } from './token/token.module';
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthenticationModule,
    TokenModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IsAuthTokenMiddleware).forRoutes('/users', '/token');
  }
}
