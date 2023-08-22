import { BASIC_ROLE_GUARD_NAME } from '@app/decorators';
import { ExecutionRequest } from '@app/shared';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BasicRole } from '@prisma/client';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<BasicRole[]>(
      BASIC_ROLE_GUARD_NAME,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const req: ExecutionRequest = context.switchToHttp().getRequest();
    return requiredRoles.includes(req.auth.role);
  }
}
