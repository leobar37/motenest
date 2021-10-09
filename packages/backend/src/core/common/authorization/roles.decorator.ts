import { SetMetadata } from '@nestjs/common';

export enum ERole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  VISITOR = 'VISITOR',
}

export const KEY_METADATA_ROL = 'roles';

/**
 *
 * @param roles
 * @description :
 * this is a decorator that attach a roles to the corresponding target
 *
 */
export const Role = (...roles: ERole[]) => SetMetadata(KEY_METADATA_ROL, roles);
