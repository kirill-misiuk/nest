import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CatsService } from './cats/cats.service';
import { CatsController } from './cats/cats.controller';
import { catsProviders } from './cats/cats.providers';
import { CatsRepository } from './cats/cats.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule.forRoot(), DatabaseModule],
    controllers: [AppController, CatsController],
    providers: [AppService, CatsService, CatsRepository, ...catsProviders],
})
export class AppModule {}
