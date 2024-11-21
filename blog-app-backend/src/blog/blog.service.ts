import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
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
  
  async findAllBlogsByUser(userId: number): Promise<BlogDetails[]> {
    const data: BlogDetailsWithUser[] = await this.blogRepository.find({ where: { userId }, relations: ['user'] });
    return data.map((blog) => ({
      id: blog.id,
      title: blog.title,
      content: blog.content,
      userName: blog.user.name,
      profilePicture: blog.user.profilePicture
    }));
  }

  async findById(id: number): Promise<BlogDetailsWithUser> {
    return await this.blogRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async deleteBlogById(id: number, userId: number): Promise<{ message: string, id: number }> {
    // Fetch the blog to ensure it exists and belongs to the user
    const blog = await this.blogRepository.findOne({ where: { id } });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    if (blog.userId !== userId) {
      throw new ForbiddenException('You are not authorized to delete this blog');
    }

    // Delete the blog
    await this.blogRepository.remove(blog);
    
    return { message: 'Blog deleted successfully', id };
  }

  
}
