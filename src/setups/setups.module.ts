import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SetupSchema } from './setup.model';
import { SetupsController } from './setups.controller';
import { SetupsService } from './setups.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Setups', schema: SetupSchema }]),
  ],
  controllers: [SetupsController],
  providers: [SetupsService],
})
export class SetupsModule {}
