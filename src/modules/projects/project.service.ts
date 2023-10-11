import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  logger = new Logger('ProjectsService');

  list() {
    return this.prisma.project.findMany({});
  }
}
