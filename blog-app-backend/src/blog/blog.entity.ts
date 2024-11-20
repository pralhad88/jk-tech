import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity'; // Assuming the User entity is in the same directory or the appropriate path.

@Entity('blog') // Name of the table in the database (if different, change accordingly)
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 }) // Same as Sequelize.STRING
  title: string;

  @Column('text') // Same as Sequelize.TEXT
  content: string;

  @Column()
  userId: number; // Foreign key referencing the `id` of the User table

  @ManyToOne(() => User, (user) => user.blogs, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'userId' }) // Specifies that `userId` in Post is the foreign key that references `User.id`
  user: User; // This will be the related User entity

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
