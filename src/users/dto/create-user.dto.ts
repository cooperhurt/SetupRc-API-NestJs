import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  @ApiProperty({
    description:
      'Usersname that they can use for logging in and displays on setups and what not',
    type: () => String,
  })
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  @ApiProperty({
    description: 'This is the encoded password used for logging in',
    type: () => String,
  })
  readonly password: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description:
      'This is the users phone number that is optional for registration',
    type: () => String,
  })
  readonly phone?: number;

  @IsNotEmpty()
  @IsNumber()
  @Length(11)
  @ApiProperty()
  readonly pid: number;
}
