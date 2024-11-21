import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Req,
  Delete
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
    return await this.blogService.createBlog(blogDetails, user);
  }

  @Get()
  async findAll(): Promise<BlogDetailsWithUser[]> {
    return await this.blogService.findAll();
  }

  @Get("/blogdetails/:id")
  async findById(@Param('id') id: number): Promise<BlogDetailsWithUser> {
    return await this.blogService.findById(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteBlogById(@Param('id') id: number, @Req() req: any): Promise<{ message: string, id }> {
    const userId = req.user.userId; // Assuming `AuthGuard` attaches the user's ID to the request
    return await this.blogService.deleteBlogById(id, userId);
}

  @Get('/blogdetails')
  @UseGuards(AuthGuard)
  async findAllBlogsByUser(@Req() req: any): Promise<BlogDetails[]> {
    const userId = req.user.userId;
    return this.blogService.findAllBlogsByUser(userId);
  }
}
