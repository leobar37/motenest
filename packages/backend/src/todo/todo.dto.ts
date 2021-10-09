import { IsString, IsBoolean } from 'class-validator';
import { IsBoolForce } from '../core';
export class CreateTodoDto {
  @IsString()
  name: string;

  @IsBoolForce()
  checked: boolean;

  @IsString()
  description: string;
}
