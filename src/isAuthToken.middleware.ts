import { AccessTokenData, RefreshTokenData } from './utils/generateToken';
import { NextFunction, Response } from 'express';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import RequestWithUser from './auth/requestWithUser.interface';

@Injectable()
export class IsAuthTokenMiddleware implements NestMiddleware {
  async use(req: RequestWithUser, res: Response, next: NextFunction) {
    const accessToken = req.headers['access-token'] as string;
    if (typeof accessToken !== 'string') {
      new HttpException('Not authenticated!', HttpStatus.UNAUTHORIZED);
    }

    try {
      const data = <AccessTokenData>(
        verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
      );
      req.userId = data.userId;
      return next();
    } catch {}

    const refreshToken = req.headers['refresh-token'] as string;
    if (typeof refreshToken !== 'string') {
      new HttpException('Not authenticated!', HttpStatus.UNAUTHORIZED);
    }

    let data;
    try {
      data = <RefreshTokenData>(
        verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
      );
    } catch {
      return next(
        new HttpException('Not authenticated!', HttpStatus.UNAUTHORIZED),
      );
    }
    req.userId = data.userId;

    next();
  }
}
