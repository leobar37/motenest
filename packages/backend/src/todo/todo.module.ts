import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { LoggerMiddleware } from '@app/core/middlewares/Logger.middleware';
@Module({
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // apply middleware for a specific route todos in this case
    consumer.apply(LoggerMiddleware).forRoutes({
      method: RequestMethod.ALL,
      path: 'todos',
    });
  }
}
