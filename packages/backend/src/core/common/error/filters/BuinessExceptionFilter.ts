import { BaseExceptionFilter } from './BaseExceptionFilters';
import { Catch, ArgumentsHost } from '@nestjs/common';
import { BusinessException } from '../exceptions';
import { yellow } from 'chalk';

@Catch(BusinessException)
export class BusinessExceptionFilter extends BaseExceptionFilter {
  constructor() {
    super();
    console.log(
      yellow(`Business Exception Initialization ${new Date().toISOString()}`),
    );
  }
  catch(exception: BusinessException, host: ArgumentsHost) {
    console.log(`Business exception ocurred  ${new Date().toISOString()}`);
    this.writeToClient(host, exception);
  }
}
