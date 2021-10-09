import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeController } from './me/me.controller';
import { TodoModule } from './todo/todo.module';
@Module({
  imports: [TodoModule],
  controllers: [AppController, MeController],
  providers: [AppService],
})
export class AppModule {}
