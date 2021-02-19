import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Widget } from './widgets.model';
@Injectable()
export class WidgetsService {

    constructor(@InjectModel('Widget') private readonly widgetModel: Model<Widget>) {

    }

    async addWidget(title: string, text: string, action: string, icon: string) {
        const newWidget = new this.widgetModel({ title, text, action, icon });
        const result = await newWidget.save();
        return result.id as string;
    }

    async getWidgets() {
        const widgets = await this.widgetModel.find().exec();
        return widgets.map((widget) => ({ id: widget.id, title: widget.title, text: widget.text, icon: widget.icon, action: widget.action })) as Widget[];
    }

    async getWidget(id: string) {
        const widget = await this.findWidget(id);
        return { id: widget.id, text: widget.text, title: widget.title, action: widget.action, icon: widget.icon };
    }

    async updateWidget(widgetId: string, title: string, text: string, action: string, icon: string) {
        const updatedWidget = await this.findWidget(widgetId);
        updatedWidget.title = title || updatedWidget.title;
        updatedWidget.text = text || updatedWidget.text;
        updatedWidget.action = action || updatedWidget.action;
        updatedWidget.icon = icon || updatedWidget.icon;
        updatedWidget.save();
    }

    async deleteWidget(widgetId: string) {
        const result = await this.widgetModel.deleteOne({ _id: widgetId }).exec();
        if (!result.n) {
            throw new NotFoundException('Could not find widget');
        }
    }

    private async findWidget(id: string): Promise<Widget> {
        // findOne() can be used also
        let widget;
        try {
            widget = await this.widgetModel.findById(id)
        } catch (error) {
            throw new NotFoundException('Could not find widget');
        }
        if (!widget) {
            throw new NotFoundException('Could not find widget');
        }
        return widget;
    }
}
