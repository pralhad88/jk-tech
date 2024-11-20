import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createOrUpdateUser(createUserDto: CreateUserDto): Promise<User> {
    // Check if user already exists (using a unique field like email or username)
    let user = await this.userRepository.findOne({
      where: { email: createUserDto.email },  // You can also use username or another unique field
    });

    if (user) {
      // If the user exists, update only the profile picture and name
      user.profilePicture = createUserDto.profilePicture
      user.name = createUserDto.name;
      user.updatedAt = new Date();

      // Save the updated user
      return this.userRepository.save(user);
    } else {
      // If the user does not exist, create a new user
      user = this.userRepository.create(createUserDto);  // Create a new user entity from the DTO
      return this.userRepository.save(user);  // Save the new user to the database
    }
  }
}
