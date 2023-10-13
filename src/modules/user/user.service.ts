import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../app/config/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: CreateUserDTO): Promise<User> {
    const { name, email, password, role } = user;
    const hashedPassword = await bcrypt.hash(password, 5);
    return this.prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });
  }

  async listAll() {
    try {
      return this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });
    } catch (e) {
      console.log(e.message);
    }
  }
}
