import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async addEvent(
    @Body('title') eventTitle: string,
    @Body('text') eventText: string,
    @Body('imageUrl') eventImageUrl: string,
  ) {
    const generatedId = await this.eventsService.addEvent(
      eventTitle,
      eventText,
      eventImageUrl,
    );
    return { id: generatedId };
  }

  @Get()
  async getEvents() {
    const events = await this.eventsService.getEvents();
    return events;
  }

  @Get(':id')
  async getEvent(@Param('id') eventId: string) {
    const event = await this.eventsService.getEvent(eventId);
    return event;
  }

  @Patch(':id')
  async upadateEvent(
    @Param('id') eventId: string,

    @Body('title') eventTitle: string,
    @Body('text') eventText: string,
    @Body('imageUrl') eventImageUrl: string,
  ) {
    await this.eventsService.updateEvent(
      eventId,
      eventTitle,
      eventText,
      eventImageUrl,
    );
    return null;
  }
  @Delete(':id')
  async deleteEvent(@Param('id') eventId: string) {
    await this.eventsService.deleteEvent(eventId);
    return null;
  }
}
