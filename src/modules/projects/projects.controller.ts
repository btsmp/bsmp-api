import {
  Controller,
  Get,
  Body,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProjectDTO } from './dto/create-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  listAll() {
    return this.projectService.list();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() project: CreateProjectDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.projectService.create(project, file);
  }
}
