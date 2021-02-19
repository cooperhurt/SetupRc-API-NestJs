import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WidgetsController } from './widgets.controller';
import { WidgetSchema } from './widgets.model';
import { WidgetsService } from './widgets.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Widget', schema: WidgetSchema}])],
  controllers: [WidgetsController],
  providers: [WidgetsService],
})
export class WidgetsModule {}
