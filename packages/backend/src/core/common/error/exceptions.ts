import { BaseException } from './BaseException';
import { HttpStatus } from '@nestjs/common';
import { ErrosCodes } from '@app/core/common/constants';
/**
 *  @description new unauthorized  exception type , in wich the user-defined exception is added
 */
export class UncaughtException extends BaseException {
  constructor() {
    super(
      400,
      'Esta operación en el sistema es anormal , Por favor contacte un administrador',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export class BusinessException extends BaseException {
  constructor(message: string) {
    super(ErrosCodes.BUSINNESS_EXCEPTION, message, HttpStatus.FORBIDDEN);
  }
}
