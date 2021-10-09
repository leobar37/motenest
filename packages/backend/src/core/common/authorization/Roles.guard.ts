import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { KEY_METADATA_ROL } from './roles.decorator';
import { blue } from 'chalk';
@Injectable()
export class RoleGuard implements CanActivate {
  /**
   * @doc  this method determine if a handler
   * is activated or not
   * @cuestion ¿Why do not use middleware? -> Middleware not contain the next handlder
   */
  constructor(private rflector: Reflector) {}
  canActivate(
    // Execution context is a class which inherits of Argumentshost
    //  this class have two useful methods
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    /*
     * this is a handler that will be invoked
     * next in the request pipline
     */
    const handler = context.getHandler();
    /**
     *  The current controller in execution
     * */
    const controller = context.getClass();
    // the context according to the application: in this case http
    const ctx = context.switchToHttp();

    // obtain metadata in this case roles
    // from a method
    const roles = this.rflector.get<string[]>(KEY_METADATA_ROL, handler);
    // from a class
    const roles2 = this.rflector.get<string[]>(KEY_METADATA_ROL, controller);

    // merge metada handler <- target
    const rolesMerge = this.rflector.getAllAndMerge<string[]>(
      KEY_METADATA_ROL,
      [controller, handler],
    );

    //  overrride keys
    const rolesOverride = this.rflector.getAllAndOverride<string[]>(
      KEY_METADATA_ROL,
      [controller, handler],
    );
    console.log(
      blue(`
       Hi, I am a guard who enters in the 
       game now :) 
       metadata of handler: ${roles?.join('-')} 
       metadata controller : ${roles2?.join('-') || null}
       metadata merge : ${rolesMerge?.join('-')}
       metadata Override : ${rolesOverride?.join('-')}
       handler : ${handler.name}
       controller : ${controller.name}
      `),
    );
    return this.validateRolesOfRequest(ctx.getRequest());
  }

  private validateRolesOfRequest(req: Request) {
    // do something with the request

    return true;
  }
}
