import { UserEntity } from './../user/entity/user.entity';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user: UserEntity;
  userId?: string;
}

export default RequestWithUser;
