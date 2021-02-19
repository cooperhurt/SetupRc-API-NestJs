import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './user.mode';
@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly UserModel: Model<User>, private authService: AuthService) {

    }

    async createUser(createUserDto: CreateUserDto) {
        const newUser = new this.UserModel(createUserDto);
        await this.isPidUnique(newUser.pid);
        await this.isUserNameUnique(newUser.username);
        const result = await newUser.save();
        return result.id as string;
    }

    async getUser(id: string) {
        const User = await this.findUser(id);
        return { id: User.id, password: User.password, username: User.username, phone: User.phone, pid: User.pid };
    }

    async login(loginUserDto: LoginUserDto) {
        const user = await this.findUserByUserName(loginUserDto.username);
        await this.checkPassword(loginUserDto.password, user);
        return {
            username: user.username,
            pid: user.pid,
            phone: user.phone,
            accessToken: await this.authService.createAccessToken(user._id),
        };
    }

    async updateUser(UserId: string, username: string, password: string, phone: number, pid: number) {
        const updatedUser = await this.findUser(UserId);
        updatedUser.username = username || updatedUser.username;
        updatedUser.password = password || updatedUser.password;
        updatedUser.phone = phone || updatedUser.phone;
        updatedUser.pid = pid || updatedUser.pid;
        updatedUser.save();
    }
    private async findUser(id: string): Promise<User> {
        // findOne() can be used also
        let User;
        try {
            User = await this.UserModel.findById(id)
        } catch (error) {
            throw new NotFoundException('Could not find User');
        }
        if (!User) {
            throw new NotFoundException('Could not find User');
        }
        return User;
    }

    private async findUserByUserName(username: string): Promise<User> {
        const user = await this.UserModel.findOne({ username });
        if (!user) {
            throw new NotFoundException('Wrong username or password.');
        }
        return user;
    }

    private async isPidUnique(pid: number) {
        const user = await this.UserModel.findOne({ pid });
        if (user) {
            throw new BadRequestException('Pid must be unique.');
        }
    }

    private async isUserNameUnique(username: string) {
        const user = await this.UserModel.findOne({ username });
        if (user) {
            throw new BadRequestException('Username must be unique.');
        }
    }

    private async checkPassword(attemptPass: string, user) {
        const match = await bcrypt.compare(attemptPass, user.password);
        if (!match) {
            throw new NotFoundException('Wrong username or password.');
        }
        return match;
    }
}
