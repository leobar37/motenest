import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeController } from './me/me.controller';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TodoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      password: 'alfk3458',
      username: 'postgres',
      host: '172.29.80.1',
      port: 5432,
      database: 'montenest',
    }),
  ],
  controllers: [AppController, MeController],
  providers: [AppService],
})
export class AppModule {}
