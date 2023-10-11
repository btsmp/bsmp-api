import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectService } from './project.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectService],
  imports: [PrismaModule],
})
export class ProjectsModule {}
