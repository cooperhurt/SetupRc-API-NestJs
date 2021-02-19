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
import { SetupsService } from './setups.service';

@Controller('setups')
export class SetupsController {
  constructor(private readonly setupService: SetupsService) {}

  @Post()
  async addSetup(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = await this.setupService.addSetup(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedId };
  }

  @Get()
  async getSetups() {
    return await this.setupService.getSetups();
  }

  @Get(':id')
  async getSetup(@Param('id') setupId: string) {
    return await this.setupService.getSetup(setupId);
  }

  @Patch(':id')
  async updateSetup(
    @Param('id') setupId: string,

    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    await this.setupService.updateSetup(
      setupId,
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return null;
  }
  @Delete(':id')
  async deleteSetup(@Param('id') setupId: ObjectId) {
    await this.setupService.deleteSetup(setupId);
    return null;
  }
}
