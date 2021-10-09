import { Injectable } from '@nestjs/common';
import { idMaker } from '../utils/id_generator';
import {
  BehaviorSubject,
  firstValueFrom,
  Observable,
  of,
  map,
  throwError,
} from 'rxjs';

import { assertProps } from '@app/core/common/utils';
export interface Todo {
  id: number;
  name: string;
  checked: boolean;
  description: string;
}

const makerID = idMaker(0);

@Injectable()
export class TodoService {
  todos$ = new BehaviorSubject<Todo[]>([
    {
      checked: true,
      description: 'lorem ipsum',
      id: makerID.next().value,
      name: 'lorem 1',
    },
    {
      checked: true,
      description:
        'lorem ipsum 2  lorem ipsum 2 lorem ipsum 2 lorem ipsum 2 lorem ipsum 2 lorem ipsum 2 lorem ipsum 2 lorem ipsum 2 lorem ipsum 2',
      id: makerID.next().value,
      name: 'lorem 2',
    },
    {
      checked: true,
      description: 'lorem ipsum 2',
      id: makerID.next().value,
      name: 'lorem 2',
    },
  ]);
  constructor() {}

  public findAllTodos({
    id,
    skip,
    limit,
  }: {
    id?: number;
    limit: number;
    skip: number;
  }): Observable<Todo[]> {
    const find = assertProps(this.todos$.value);
    return of(
      find({
        id,
        skip,
        limit,
      }),
    );
  }

  public async updateTodo(id: number, todo: Todo) {
    const [old, arr] = await firstValueFrom(
      this.todos$.asObservable().pipe(
        map<Todo[], [Todo, Todo[]]>((arr) => {
          const idx = arr.findIndex((d) => d.id == id);
          let prev = arr[idx];
          prev = {
            ...prev,
            ...todo,
          };
          arr.splice(idx, 1, prev);
          if (!prev) {
            // TODO: replace with correct exception
            throw throwError(() => new Error(`No exist todo with id ${id}`));
          }
          return [prev, arr];
        }),
      ),
    );
    this.todos$.next(arr);
    return old;
  }
  public async createTodo(todo: Partial<Todo>): Promise<Todo> {
    const oldTodos = this.todos$.value;
    const id = makerID.next();
    const newTodo = { id: id.value, ...todo } as Todo;
    oldTodos.push(newTodo);
    this.todos$.next(oldTodos);
    return newTodo;
  }
  public async deleteTodo(id: number): Promise<Todo> {
    const [old, arr] = await firstValueFrom(
      this.todos$.asObservable().pipe(
        map<Todo[], [Todo, Todo[]]>((arr) => {
          const idx = arr.findIndex((d) => d.id == id);
          const prev = arr[idx];
          delete arr[idx];
          if (!prev) {
            // TODO: replace with correct exception
            throw throwError(() => new Error(`No exist todo with id ${id}`));
          }
          return [prev, arr];
        }),
      ),
    );
    this.todos$.next(arr);
    return old;
  }
}
