import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [UserModule, AuthModule],
  providers: [LoginService],
  controllers: [LoginController],
})
export class LoginModule {}
