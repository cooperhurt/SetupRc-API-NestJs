import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from 'src/events/events.model';
@Injectable()
export class EventsService {

    constructor(@InjectModel('Event') private readonly eventModel: Model<Event>) {

    }

    async addEvent(title: string, text: string, imageUrl: string) {
        const newEvent = new this.eventModel({ title, text, imageUrl });
        const result = await newEvent.save();
        return result.id as string;
    }

    async getEvents() {
        const events = await this.eventModel.find().exec();
        return events.map((event) => ({ id: event.id, title: event.title, text: event.text, imageUrl: event.imageUrl })) as Event[];
    }

    async getEvent(id: string) {
        const event = await this.findEvent(id);
        return { id: event.id, text: event.text, title: event.title, imageUrl: event.imageUrl };
    }

    async updateEvent(eventId: string, title: string, text: string, imageUrl: string) {
        const updatedEvent = await this.findEvent(eventId);
        updatedEvent.title = title || updatedEvent.title;
        updatedEvent.text = text || updatedEvent.text;
        updatedEvent.imageUrl = imageUrl || updatedEvent.imageUrl;
        updatedEvent.save();
    }

    async deleteEvent(eventId: string) {
        const result = await this.eventModel.deleteOne({ _id: eventId }).exec();
        if (!result.n) {
            throw new NotFoundException('Could not find event');
        }
    }

    private async findEvent(id: string): Promise<Event> {
        // findOne() can be used also
        let event;
        try {
            event = await this.eventModel.findById(id)
        } catch (error) {
            throw new NotFoundException('Could not find event');
        }
        if (!event) {
            throw new NotFoundException('Could not find event');
        }
        return event;
    }
}
