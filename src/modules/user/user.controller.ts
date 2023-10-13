import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { Roles } from 'src/core/decorators/role.decorator';
import { Role } from 'src/core/enums/role.enum';
import { RolesGuard } from 'src/core/guards/role.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(Role.Root)
  async create(@Body() user: CreateUserDTO) {
    const newUser = await this.userService.create(user);
    return {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    };
  }
  @Get()
  list() {
    return this.userService.listAll();
  }
}
