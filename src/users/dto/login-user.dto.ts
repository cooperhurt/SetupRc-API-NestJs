import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  readonly password: string;
}
