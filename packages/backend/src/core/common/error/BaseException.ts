import { HttpException } from '@nestjs/common';

export class BaseException extends HttpException {
  /**
   * create an instance of BaseException
   * @param exceptionCode custom exception number
   * @param errorMessage error message promp information
   * @param statusCode status code (http status code)
   */
  constructor(
    public exceptionCode: number | string,
    public errorMessage: string,
    public statusCode: number,
  ) {
    super(
      {
        exceptionCode,
        message: errorMessage,
      },
      statusCode,
    );
  }
}
