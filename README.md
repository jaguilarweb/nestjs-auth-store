<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Curso NESTJS Autenticación con Passport y JWT

## Descripción
Este curso incorpora la autenticación con Passport y JWT al store que hemos ido creando en la saga de cursos de Nestjs, ofrecidos por Platzi.


## Herramientas

- NodeJS
- NestJS
- TypeORM
- MySQL y/o Postgress
- Docker
- Postman

## Comandos de uso frecuente
```bash
NODE_ENV=dev npm run start:dev
```
Comando para ver los puertos usados en MAC
```bash
lsof -i -P | grep -i listen
```

Configuración Server: **172.18.0.2**



## Guards

Los guardianes en Nestjs son clases con el decorador @Injectable y tienen una sola responsabilidad. Ellos determinan si un request será manejado por el controlador o no, dependiendo de ciertas condiciones (como permisos, roles, ACLs, etc) presentes en tiempo de ejecución.
Esto a menudo se denomina como autorización. La Autorización (y su prima la Autenticación, con la que suele colaborar) normalmente ha sido manejada por los middleware en las aplicaciones de Express tradicionales. Los Middleware son una buena elección de autenticación ya que elementos como la validación de tokens y asociación de propiedades a los objetos request no están fuertemente conectados con un contexto de ruta en particular (y su metadata).

Pero los middleware, por naturaleza, son tontos. No saben cuál manejador será ejecutado después de llamar a la función 'next()'. Por otra parte, los Guardianes tienen acceso a la instancia 'ExecutionContext' y, por lo tanto, saben exactamente qué es lo siguiente que será ejecutado. 


## Hashing de contraseñas TypeORM

Para el hashing de contraseñas, se utiliza la librería bcrypt, la cual es una librería de encriptación de contraseñas. Para instalarla, se ejecuta el siguiente comando:

```bash
npm install bcrypt
```

Como trabajamos con typescript es necesaria la libreria de tipado:

```bash
npm install @types/bcrypt -D
```


## Passport

Passport es un middleware de autenticación para Node.js. Extremadamente flexible y modular, Passport puede ser sin esfuerzo integrado a cualquier aplicación Express, y se puede utilizar junto con cualquier base de datos y/o motor de plantillas.

Para instalarlo, se ejecuta el siguiente comando:

```bash
npm install @nestjs/passport passport passport-local
npm install --save-dev @types/passport-local
```

Debemos implementar una Strategy


## JWT

JSON Web Token (JWT) es un estándar abierto basado en JSON propuesto por IETF para la creación de tokens de acceso que permiten la propagación de identidad y privilegios entre dos partes de forma segura, confiable y simple.
Este token nos permite saber que usuario está logueado y a su vez le permite al usuario logueado hacer request.

A diferencia de las cookies o de las sesiones que corren al lado del navegador, los jwt podemos utilizarlos para aplicaciones móviles.

Para instalarlo, se ejecuta el siguiente comando:

```bash
npm install --save @nestjs/jwt passport-jwt
npm install --save-dev @types/passport-jwt
```

## Implementación de JWT

Luego de instalar las librerias, importamos el módulo de jwt en el archivo auth module:
  
  ```bash
  import { JwtModule } from '@nestjs/jwt';
  ```

Luego, en el mismo archivo, agregamos el módulo de jwt en el array de imports y le damos la siguiente configuración:

```ts
imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({ //Async nos permite usar useFactory
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret, //Leemos desde una variable de entorno el valor
          signOptions: {
            expiresIn: '10d', //tiempo de expiración del token
          },
        };
      },
    }),
  ],
  ```

Hay estrategias que permiten hacer un refresh del token (actualización), de ese modo los tiempos de expiración se limitan a segundos. Pero no lo veremos en este contenido. 
Posibles referencias: [link](https://wanago.io/2020/09/21/api-nestjs-refresh-tokens-jwt/)

Debemos agregar la variable de entorno a los archivos de entornos '.env', etc.

Luego agregamos en el archivo config.ts, el archivo de configuración de variables de entorno, este item:

```ts
jwtSecret: process.env.JWT_SECRET,
```

También podemos validarlo en el modulo app module:
  
  ```ts
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        JWT_SECRET: Joi.string().required(), //Validamos para que no se olvide incorporarlo
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    HttpModule,
    UsersModule,
    ProductsModule,
    DatabaseModule,
    AuthModule,
  ],
  ```

Con esta configuración ya podemos leer y generar nuestro jwt desde el servicio:

```ts
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
```

Ahora debemos crear el metodo para crear el jwt en el servicio.
  
  ```ts
  generateJWT(user: UserEntity) {
    const payload: PayloadToken = { role: user.role, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
  ```

  Ahora lo llamamos en el controlador:

  ```ts
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    const user = req.user as UserEntity;
    return this.authService.generateJWT(user);
  }
  ```

  Ahora debemos crear el método para validar el jwt en los endpoint, para lo anterior crearemos una strategy y un guardian.

Nota: Cuando la inyección viene en el constructor, debemos utilizar el Inject de '@nestjs/common'.
  
```ts
export class LocalStrategy extends PassportStrategy(Strategy, 'jwt') {
  // recibir token y desencriptarlo y darle permiso
  constructor(@Inject(config.KEY) configService: ConfigType<typeof config>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //Extraerlo de la cabecera con la opción Bearer
      ignoreExpiration: false,  //No ignorar la expiración del token
      secretOrKey: configService.jwtSecret,
    });
  }

  //Una vez desencriptado retorna el payload tipado con un sub y password
  validate(payload: PayloadToken) {
    return payload;
  }
}
```

Ahora lo importamos en el archivo de auth module, y lo agregamos dentro de los providers.

Luego protegemos todos los endpoint, por ejemplo de product, con un guard usando la estrategia de jwt.

```ts
@UseGuards(AuthGuard('jwt'))
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
}
```

### Custom Guard

En el caso que requiramos exeptuar algunos endpoint del guard que exige el token jwt, extenderemos un guard personalizado:

```ts
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
```

Implementación en el controller:

```ts
@UseGuards(JwtAuthGuard) //Implementamos el Guard personalizado que exige el token si no existe el decorador @IsPublic.
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Public() //Si se encuentra presente este decorador, no se exigirá el token
  @Get()
  getProducts() {
    return this.productsService.findAll();
  }
}
  ```

### Control de roles

1 - Definiremos los roles, mediante un model.

Creamos un archivo en el directorio auth/models.

2.- Ahora creamos un decorador para los roles.

```ts
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
```

3.- Implementamos los guardianes en el endpoint

```ts
@UseGuards(JwtAuthGuard, RolesGuard) //Aquí podemos definir más de un guardian y todos los endpoint pasan por estos guardianes
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
}
```

E implementamos el decorador en el o los endpoint donde queremos definir los roles

```ts
  @Roles(Role.ADMIN) //Podriamos definir mas de un rol ejm (Role.ADMIN, Role.CUSTOMER)
  @Post()
  create(@Body() payload: CreateProductDtos) {
    return this.productsService.create(payload);
  }
```

