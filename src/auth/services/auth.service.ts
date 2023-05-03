import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  //Primer parámetro identificador del usuario, segundo parametro es el password
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        /* const { password, ...rta } = user; //Para que no aparezca el password en Mongo
        return rta */
        return user;
      }
    }
    return null;
  }
}
