import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDetails } from './dto/login.details'

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('')
  async userLogin(@Body() loginDetails: LoginDetails) {
    return this.loginService.userLogin(loginDetails);
  }
}
