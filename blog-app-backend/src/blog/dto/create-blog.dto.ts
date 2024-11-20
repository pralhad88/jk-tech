import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsInt()
  @IsOptional()
  userId?: number;  // userId is optional for creation if you handle user creation separately
}
