import {
  BadRequestException,
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    await this.createRootUser();
  }

  async createRootUser() {
    const prisma = new PrismaClient();
    const logger = new Logger('PrismaRoot');
    try {
      const rootUser = await prisma.user.findFirst({
        where: { role: 0 },
      });

      if (!rootUser) {
        const passwordHashed = await bcrypt.hash(process.env.ROOT_PASSWORD, 10);
        await prisma.user.create({
          data: {
            name: process.env.ROOT_NAME,
            email: process.env.ROOT_EMAIL,
            password: passwordHashed,
            role: 0,
          },
        });
        return logger.log('ROOT USER CREATED');
      }

      return logger.log('ROOT USER ALREADY EXISTS');
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
