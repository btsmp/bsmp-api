import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';
import { UserModule } from './modules/user/user.module';
import { ProjectsController } from './modules/projects/projects.controller';
import { ProjectService } from './modules/projects/project.service';
import { ProjectsModule } from './modules/projects/projects.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaService } from './app/config/prisma.service';
import { LoggerMiddleware } from './core/middlewares/logger.middleware';
import { CloudinaryService } from './app/config/cloudinary.service';
import { AuthController } from './modules/auth/auth.controller';

@Module({
  imports: [UserModule, ProjectsModule, AuthModule],
  controllers: [UserController, ProjectsController, AuthController],
  providers: [UserService, ProjectService, PrismaService, CloudinaryService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
