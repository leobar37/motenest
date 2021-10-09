import {
  registerDecorator,
  ValidateByOptions,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isBoolean } from 'class-validator';
import { orIn } from '../utils';

@ValidatorConstraint({
  name: 'is Boolean Force',
  async: false,
})
export class IsBooleanForceConstraint implements ValidatorConstraintInterface {
  /**
   * @note if you can resturn a promise please declare async property in true
   */
  validate(value: any, validationArguments?: ValidationArguments): boolean {
    const isBool = isBoolean(value);

    if (isBool) {
      return true;
    }
    if (typeof value == 'string') {
      return orIn(value === 'true', value === 'false') as any;
    }

    return false;
  }
  defaultMessage({ targetName, value }: ValidationArguments): string {
    return `The value ${value} not is boolean`;
  }
}

export function IsBoolForce(options?: ValidationOptions) {
  return function (obj: Object, propertyName: string) {
    registerDecorator({
      name: 'isBooleanForce',
      target: obj.constructor,
      propertyName: propertyName,
      options: options,
      validator: IsBooleanForceConstraint,
    });
  };
}
