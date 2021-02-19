import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackSchema } from './track.model';
import { TracksControllers } from './tracks.controller';
import { TracksService } from './tracks.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tracks', schema: TrackSchema }]),
  ],
  controllers: [TracksControllers],
  providers: [TracksService],
})
export class TracksModule {}
