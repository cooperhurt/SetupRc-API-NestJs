import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UsersController } from './user.controller';
import { UsersSchema } from './user.mode';
import { UsersService } from './user.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UsersSchema }]),
        AuthModule,
    ],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule { }
