import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Blog } from '../blog/blog.entity'; // Correct path to Post entit

@Entity()
export class User {
  // One-to-Many relationship: One User can have many Posts
  @OneToMany(() => Blog, (post) => post.user)
  blogs: Blog[];

  // Primary Key with auto increment
  @PrimaryGeneratedColumn()
  id: number;

  // Name column, can be nullable
  @Column({ type: 'varchar', nullable: true })
  name: string;

  // Name column, can be nullable
  @Column({ type: 'varchar', nullable: true })
  profilePicture: string;

  // Email column, unique and cannot be null
  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  // Provider column, cannot be null
  @Column({ type: 'varchar', nullable: false })
  provider: string;

  // ProviderId column, cannot be null
  @Column({ type: 'varchar', nullable: false })
  providerId: string;

  // CreatedAt column, automatically populated by TypeORM
  @CreateDateColumn()
  createdAt: Date;

  // UpdatedAt column, automatically populated by TypeORM
  @UpdateDateColumn()
  updatedAt: Date;
}
