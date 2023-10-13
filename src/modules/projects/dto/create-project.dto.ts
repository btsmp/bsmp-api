import { IsOptional, IsString } from 'class-validator';

export class CreateProjectDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  githubLink: string;

  @IsOptional()
  @IsString()
  projectLink?: string;

  @IsString({ each: true })
  techs: string | string[];

  image: string;
}
