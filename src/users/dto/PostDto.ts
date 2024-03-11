import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PostDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  description: string;
}
export class UpdatePostDto {
  @IsOptional()
  @IsString()
  title?: string;
  @IsOptional()
  @IsString()
  description?: string;
}
