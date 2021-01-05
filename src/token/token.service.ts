import { UserEntity } from './../user/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { createTokens } from 'src/utils/generateToken';

@Injectable()
export class TokenService {
  public async sendNewTokens(userId: string) {
    const user = await UserEntity.findOne({ id: userId });
    return createTokens(user);
  }
}
