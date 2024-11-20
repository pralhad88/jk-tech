import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { JWTLoginPayload } from '../login/login.interface'


@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // Generate JWT Token for the user
  async login(user: JWTLoginPayload): Promise<{accessToken: string}> {
    const payload: JwtPayload = { username: user.username, sub: user.userId };
    return {
        accessToken: this.jwtService.sign(payload), // Sign the payload and return the token
    };
  }
}
