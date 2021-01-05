import { UserEntity } from './../user/entity/user.entity';
import { sign } from 'jsonwebtoken';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export type RefreshTokenData = {
  userId: string;
};

export type AccessTokenData = {
  userId: string;
};

export const createTokens = (
  user: UserEntity,
): { refreshToken: string; accessToken: string } => {
  const refreshToken = sign(
    { userId: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '14d',
    },
  );
  const accessToken = sign(
    { userId: user.id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '15min',
    },
  );

  return { refreshToken, accessToken };
};
