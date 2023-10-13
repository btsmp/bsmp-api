import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { Roles } from 'src/core/decorators/role.decorator';
import { Role } from 'src/core/enums/role.enum';
import { RolesGuard } from 'src/core/guards/role.guard';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.Root)
  @Post()
  async create(@Body() user: CreateUserDTO) {
    return this.userService.create(user);
  }

  @Get()
  list() {
    return this.userService.listAll();
  }
}
