import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    const generatedId = await this.usersService.createUser(createUserDto);
    return { id: generatedId };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.usersService.login(loginUserDto);
  }

  @Patch(':id')
  async upadateUser(
    @Param('id') userId: string,

    @Body('username') username: string,
    @Body('password') password: string,
    @Body('phone') phone: number,
    @Body('pid') pid: number,
  ) {
    await this.usersService.updateUser(userId, username, password, phone, pid);
    return null;
  }
}
