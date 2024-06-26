// jwt-auth.guard.ts

import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/is-public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const canActivate = await super.canActivate(context);

    if (typeof canActivate === 'boolean') {
      return canActivate;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Your roles logic here - modify this according to your token structure
    const requiredRoles = this.reflector.get<string[]>('teacher', context.getHandler());
    if (!requiredRoles || !user.role || !user.roles.some(role => requiredRoles.includes(role))) {
      throw new UnauthorizedException('Unauthorized access');
    }

    return true;
  }
}
