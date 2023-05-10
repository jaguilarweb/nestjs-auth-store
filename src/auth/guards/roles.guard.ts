import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { ROLES_KEY } from '../decorators/roles.decorator';
import { PayloadToken } from '../models/token.model';
import { Role } from '../models/roles.model';

@Injectable()
export class RolesGuard implements CanActivate {
  //Solo cuando hay herencia se utiliza el super();
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      //No necesito validación de roles, por tanto, lo deja pasar.
      return true;
    }
    // output ['admin', 'customer']; Llega un array con el contexto y se pueden enviar varios, definidos en el controller.
    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;
    // output {role: 'admin', sub:1212}
    const isAuth = roles.some((role) => role === user.role);
    if (!isAuth) {
      throw new UnauthorizedException('You dont have permission to access');
    }
    return isAuth;
  }
}
