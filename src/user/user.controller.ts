/* import { CreateUserDto } from './dto/user.dto';
import { UserEntity } from './entity/user.entity'; */
import { UserService } from './user.service';
import { Controller } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
}
