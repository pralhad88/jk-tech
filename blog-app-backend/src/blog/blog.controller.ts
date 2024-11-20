import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Blog } from './blog.entity';
import { AuthGuard } from '../auth/auth.guard';
import { BlogDetails, BlogDetailsWithUser } from './blog.interface'

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() blogDetails: CreateBlogDto,
    @Req() req: any,
  ): Promise<Blog> {
    const user = req.user;
    return this.blogService.createBlog(blogDetails, user);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(): Promise<BlogDetailsWithUser[]> {
    return this.blogService.findAll();
  }

  @Get('/blogdetails')
  async findAllBlogsDetails(): Promise<BlogDetails[]> {
    return this.blogService.findAllBlogsDetails();
  }
}
