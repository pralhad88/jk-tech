import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { LoginDetails } from './dto/login.details';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { JWTLoginPayload, LoginResponse } from './login.interface';

@Injectable()
export class LoginService {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  formatUserData(response: any, provider: string): CreateUserDto {
    if (provider === 'google') {
      return {
        email: response.email,
        name: response.name
          ? response.name
          : `${response.given_name} ${response.family_name}`,
        profilePicture: response.picture,
        providerId: response.sub,
        provider: provider,
      };
    }
    return {
      email: response.email,
      name: response.name
        ? response.name
        : `${response.first_name} ${response.last_name}`,
      profilePicture: response?.picture['data']['url'],
      providerId: response.id,
      provider: provider,
    };
  }

  async getGoogleUserDetails(idToken: string): Promise<any> {
    try {
      const googleTokenInfoUrl = 'https://oauth2.googleapis.com/tokeninfo';
      const response = await axios.get(
        `${googleTokenInfoUrl}?id_token=${idToken}`,
      );
      return response.data; // Contains user details like email, name, etc.
    } catch (error) {
      throw new HttpException(
        `Failed to fetch Google user details: ${error.message}`,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async getFacebookUserDetails(accessToken: string): Promise<any> {
    try {
      const facebookGraphUrl = 'https://graph.facebook.com/me';
      const response = await axios.get(facebookGraphUrl, {
        params: {
          access_token: accessToken,
          fields: 'id,name,email,picture,first_name,last_name', // Request specific fields
        },
      });
      return response.data; // Contains user details like name, email, etc.
    } catch (error) {
      throw new HttpException(
        'Failed to fetch Facebook user details',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async userLogin(loginDetails: LoginDetails): Promise<LoginResponse> {
    const { provider, token } = loginDetails;
    let response: any;

    if (provider === 'google') {
      response = await this.getGoogleUserDetails(token);
    } else {
      response = await this.getFacebookUserDetails(token);
    }

    const userData: CreateUserDto = this.formatUserData(response, provider);
    const data = await this.userService.createOrUpdateUser(userData);
    const user: JWTLoginPayload = {
      username: data.email,
      userId: data.id,
    };
    const accessToken = await this.authService.login(user);
    return {
      email: data.email,
      name: data.name,
      profilePicture: data.profilePicture ? data.profilePicture : null,
      ...accessToken,
    };
  }
}
