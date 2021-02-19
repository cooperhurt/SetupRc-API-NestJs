import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { WidgetsService } from './widgets.service';

@Controller('widgets')
export class WidgetsController {
  constructor(private readonly widgetsService: WidgetsService) { }

  @Post()
  async addWidget(
    @Body('title') widgetTitle: string,
    @Body('text') widgetText: string,
    @Body('action') widgetAction: string,
    @Body('icon') widgetIcon: string
  ) {
    const generatedId = await this.widgetsService.addWidget(widgetTitle, widgetText, widgetAction, widgetIcon);    
    return { id: generatedId }
  }

  @Get()
  async getWidgets() {
    const widgets = await this.widgetsService.getWidgets();    
    return widgets;
  }

  @Get(':id')
  async getWidget(@Param('id') widgetId: string) {
    const widget = await this.widgetsService.getWidget(widgetId);
    return widget;
  }

  @Patch(':id')
  async upadateWidget(
    @Param('id') widgetId: string,

    @Body('title') widgetTitle: string,
    @Body('text') widgetText: string,
    @Body('action') widgetAction: string,
    @Body('icon') widgetIcon: string) {
    await this.widgetsService.updateWidget(widgetId, widgetTitle, widgetText, widgetAction, widgetIcon);
    return null;
  }
  @Delete(':id')
  async deleteWidget(
    @Param('id') widgetId: string,
  ) {
    await this.widgetsService.deleteWidget(widgetId);
    return null;
  }
}
