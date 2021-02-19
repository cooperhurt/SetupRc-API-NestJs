import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/user.module';
import { WidgetsModule } from './widgets/widgets.module';
import { SetupsModule } from './setups/setups.module';
import { TracksModule } from './tracks/tracks.module';

@Module({
  imports: [
    ProductsModule,
    WidgetsModule,
    EventsModule,
    UsersModule,
    SetupsModule,
    TracksModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.DATABASEURL, {
      useNewUrlParser: true,
    }),
    ClientsModule.register([
      {
        name: 'SETUP_SERVICE',
        transport: Transport.REDIS,
        options: {
          url: 'redis://localhost:6379',
        },
      },
    ]),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
