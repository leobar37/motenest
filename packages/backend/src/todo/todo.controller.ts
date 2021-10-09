import {
  Body,
  Controller,
  Delete,
  Get,
  Query,
  HttpCode,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Todo, TodoService } from './todo.service';
import {
  BusinessExceptionFilter,
  BusinessException,
} from '@app/core/common/error';
import {
  ParseBoolPipe,
  DefaultValuePipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ValidationPipe } from '@app/core';
import { CreateTodoDto } from './todo.dto';
import { RoleGuard, Role, ERole } from '@app/core/common';
import { DataTransformation } from '@app/core/common/interceptors';
@Controller('todos')
// apply a guard
@UseGuards(RoleGuard)
@Role(ERole.ADMIN, ERole.USER)
// use interceptors
@UseInterceptors(DataTransformation)
@UseFilters(BusinessExceptionFilter)
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  findAll(
    @Query('id') id: number,
    @Query('skip', new DefaultValuePipe(0)) skip: number,
    @Query('limit', new DefaultValuePipe(5)) limit: number,
  ): Observable<Todo[]> {
    return this.todoService.findAllTodos({ id: Number(id), skip, limit });
  }

  @Post('exception')
  public exception(@Body('exception', ParseBoolPipe) lauchException: boolean) {
    // this validations is a bad practice because nest implement pipes
    // see :https://docs.nestjs.com/pipes
    // const resultFromSomeResource = () => Boolean(exception);
    if (lauchException) {
      throw new BusinessException('Hello world');
    }
    return {
      msg: 'Nothing to see',
    };
  }

  //   update todo
  @Put(':id')
  async updateTodo(@Param('id') id: number, @Body() todo: Todo) {
    return this.todoService.updateTodo(id, todo);
  }

  @Post()
  // by default in post is 201
  @HttpCode(200)
  async createTodo(@Body(ValidationPipe) todo: CreateTodoDto) {
    return this.todoService.createTodo({
      checked: todo.checked,
      description: todo.description,
      name: todo.description,
    });
  }

  @Delete(':id')
  public async deleteTodo(@Param('id') id: number) {
    return this.todoService.deleteTodo(id);
  }
}
