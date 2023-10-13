import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { PrismaService } from '../../app/config/prisma.service';
import { CreateProjectDTO } from './dto/create-project.dto';
import { CloudinaryService } from 'src/app/config/cloudinary.service';

@Injectable()
export class ProjectService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cdn: CloudinaryService,
  ) {}

  logger = new Logger('ProjectsService');

  async list() {
    const projects = await this.prisma.project.findMany({
      include: {
        techs: true,
      },
    });

    return { projects };
  }

  async create(data: CreateProjectDTO, file: Express.Multer.File) {
    const { title, description, githubLink, projectLink } = data;
    let techs: string[];

    if (typeof data.techs === 'string') {
      techs = data.techs.split(',');
    } else {
      techs = data.techs;
    }

    try {
      this.logger.log('Creating a new project');

      const { url: imageUrl } = await this.cdn.upload(file);
      const newProject = await this.prisma.project.create({
        data: {
          title,
          githubLink,
          description,
          projectLink,
          imageUrl,
          techs: {
            connectOrCreate: techs.map((techName) => ({
              where: { name: techName },
              create: { name: techName },
            })),
          },
        },
      });
      this.logger.log(`New project created: ${newProject.id}`);
      return { newProject };
    } catch (e) {
      this.logger.debug(`erro ${e.message}`);
      throw new ServiceUnavailableException('Problemas com a chamada');
    }
  }
}
