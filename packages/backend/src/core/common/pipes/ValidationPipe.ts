import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

/*
 * ALl pipes are injectables in other words all are suppliers
 */
import { validate } from 'class-validator';

/*

@see : https://github.com/typestack/class-transformer#what-is-class-transformer
 */
import { plainToClass } from 'class-transformer';

/**
 * @description  this pipe valida a dto
 */
@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    // if a body is a class pipe return the same value
    console.log('Pipes pass before reaching the controller');

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    // object-plane -> class
    const object = plainToClass(metatype, value);

    const errors = await validate(object);
    if (errors.length > 0) {
      console.log(errors);

      throw new BadRequestException('Body have invalid values');
    }
    return value;
  }
  // this  types are ignored by this pipe
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
