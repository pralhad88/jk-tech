import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { LoginModule } from './login/login.module';
import { User } from './user/user.entity';
import { Blog } from './blog/blog.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Make config globally available
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT): 5432, // Make sure to cast to number
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      schema: process.env.DB_SCHEMA,
      entities: [User, Blog],
      synchronize: false, // Should be false in production for safety
      logging: false
    }),
    UserModule,
    BlogModule,
    LoginModule
  ],
})
export class AppModule {}
