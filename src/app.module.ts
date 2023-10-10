import { Module } from '@nestjs/common';
import { UserController } from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';
import { UserModule } from './modules/user/user.module';
import { ProjectsController } from './modules/projects/projects.controller';
import { ProjectsService } from './modules/projects/projects.service';
import { ProjectsModule } from './modules/projects/projects.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaService } from './modules/prisma/prisma.service';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [UserModule, ProjectsModule, AuthModule, PrismaModule],
  controllers: [UserController, ProjectsController],
  providers: [UserService, ProjectsService, PrismaService],
})
export class AppModule {}
