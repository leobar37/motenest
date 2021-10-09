import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';

import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { BaseException } from '../BaseException';
import { Response, Request } from 'express';

export abstract class BaseExceptionFilter
  implements ExceptionFilter<BaseException>
{
  /**
   *
   * @param exception is the exception object currently being proccessed
   * @param host utilities for handle the host arguments
   */
  abstract catch(exception: BaseException, host: ArgumentsHost);

  /**
   * @note
   * a protected method is like a private method in that it can only
   * invoked of a classe or subclass. it differs from a private method in
   * that it may be explicity invoked on any instance of the subclass
   *  */
  protected getHttpContext(host: ArgumentsHost) {
    return host.switchToHttp();
  }

  protected getResponse(host: HttpArgumentsHost): Response {
    return host.getResponse<Response>();
  }
  protected getRequest(host: HttpArgumentsHost): Request {
    return host.getRequest<Request>();
  }

  /**
   * write exception to the client
   */
  protected writeToClient(host: ArgumentsHost, exception: BaseException) {
    const ctx = this.getHttpContext(host);
    const response = this.getResponse(ctx);
    if (exception instanceof BaseException) {
      response.status(exception.getStatus()).json({
        exceptionCode: exception.exceptionCode,
        message: exception.message,
        path: this.getRequest(ctx).url,
        timeout: new Date().getTime(),
      });
    } else {
      response.status(500).json({
        message: 'Unhandled exception',
        path: this.getRequest(ctx).url,
      });
    }
  }
}
