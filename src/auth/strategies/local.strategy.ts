import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthService } from '../services/auth.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    //Herencia, por tanto llama a super()
    super({
      //Cambiamos los naming de las variables
      usernameField: 'email', //Por defecto es username
      passwordField: 'password',
    });
  }

  //Validar la existencia de un usuario, en una db, con un correo y password determinado.
  async validate(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      //Si no existe el usuario
      throw new UnauthorizedException('User or password not allow');
    }
    //Si existe el usuario
    return user;
  }
}
