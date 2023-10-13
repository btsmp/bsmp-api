import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectService } from './project.service';
import { PrismaService } from 'src/app/config/prisma.service';
import { CloudinaryService } from 'src/app/config/cloudinary.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectService, PrismaService, CloudinaryService],
})
export class ProjectsModule {}
