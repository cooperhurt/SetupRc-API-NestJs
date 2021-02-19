import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { TracksService } from './tracks.service';

@Controller('tracks')
export class TracksControllers {
  constructor(private readonly trackService: TracksService) {}

  @Post()
  async addTrack(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = await this.trackService.addTrack(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedId };
  }

  @Get()
  async getTracks() {
    return await this.trackService.getTracks();
  }

  @Get(':id')
  async getTrack(@Param('id') setupId: string) {
    return await this.trackService.getTrack(setupId);
  }

  @Patch(':id')
  async updateTrack(
    @Param('id') setupId: string,

    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    await this.trackService.updateTrack(
      setupId,
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return null;
  }
  @Delete(':id')
  async deleteTrack(@Param('id') setupId: ObjectId) {
    await this.trackService.deleteTrack(setupId);
    return null;
  }
}
