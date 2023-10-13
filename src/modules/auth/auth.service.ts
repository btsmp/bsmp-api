import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/app/config/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = {
        sub: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
