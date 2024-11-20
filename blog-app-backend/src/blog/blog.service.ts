import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { BlogDetails, BlogDetailsWithUser } from './blog.interface';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ) {}

  // Create blog method
  async createBlog(blogDetails: CreateBlogDto, user: any): Promise<Blog> {
    blogDetails['userId'] = user['userId'];
    const blog = this.blogRepository.create(blogDetails);
    return this.blogRepository.save(blog);
  }

  async findAll(): Promise<BlogDetailsWithUser[]> {
    const blogs = await this.blogRepository.find({
      relations: ['user'],
    });

    // Map over the results to filter out unnecessary properties
    return blogs.map((blog) => ({
      id: blog.id,
      title: blog.title,
      content: blog.content,
      userId: blog.userId,
      user: {
        name: blog.user.name,
        profilePicture: blog.user.profilePicture,
        email: blog.user.email,
      },
    }));
  }

  async findAllBlogsDetails(): Promise<BlogDetails[]> {
    const data: BlogDetailsWithUser[] = await this.findAll();
    return data.map((blog) => ({
      id: blog.id,
      title: blog.title,
      content: blog.content,
      userName: blog.user.name,
    }));
  }
}
