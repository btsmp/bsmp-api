import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Body() user: CreateUserDTO) {
    return this.userService.create(user);
  }

  @Get()
  list() {
    return this.userService.listAll();
  }
}
