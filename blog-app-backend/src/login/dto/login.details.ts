import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class LoginDetails {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['google', 'facebook'], { message: 'Provider must be either "google" or "facebook".' })
  provider: string;
}
