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
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  readonly password: string;

  @IsNotEmpty()
  @IsNumber()
  readonly phone: number;

  @IsNotEmpty()
  @IsNumber()
  @Length(11)
  readonly pid: number;
}
