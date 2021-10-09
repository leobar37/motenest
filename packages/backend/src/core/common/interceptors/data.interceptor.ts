/**
 * this interceptor take the result from the handle
 * and trasform this to the standar response
 * {
 *  ok ,
 *  data
 * }
 */
import {
  Injectable,
  ExecutionContext,
  CallHandler,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { green } from 'chalk';
import { map, tap } from 'rxjs';
interface ResponseData<T> {
  ok: boolean;
  data: T;
}

@Injectable()
export class DataTransformation
  implements NestInterceptor<any, ResponseData<any>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<ResponseData<any>> {
    console.log(green('Intercept logs'));
    console.log('before call method');
    return next.handle().pipe(
      tap((d) => {
        console.log('resulting data');
        console.log(d);
      }),
      map((d) => {
        return {
          ok: true,
          data: d,
        };
      }),
      tap((d) => {
        console.log('transformed data');
        console.log(d);
        console.log(green('End interceptor logs'));
      }),
    );
  }
}
