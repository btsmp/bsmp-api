import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';
import { UserModule } from './modules/user/user.module';
import { ProjectsController } from './modules/projects/projects.controller';
import { ProjectService } from './modules/projects/project.service';
import { ProjectsModule } from './modules/projects/projects.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaService } from './modules/prisma/prisma.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { LoggerMiddleware } from './core/middlewares/logger.middleware';

@Module({
  imports: [UserModule, ProjectsModule, AuthModule, PrismaModule],
  controllers: [UserController, ProjectsController],
  providers: [UserService, ProjectService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
