import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: CreateUserDTO) {
    const { name, email, password, role } = user;
    return this.prisma.user.create({ data: { name, email, password, role } });
  }

  async listAll() {
    return this.prisma.user.findMany({});
  }
}
