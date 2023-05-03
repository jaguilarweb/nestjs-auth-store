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


## Guards

Los guardianes en Nestjs son clases con el decorador @Injectable y tienen una sola responsabilidad. Ellos determinan si un request será manejado por el controlador o no, dependiendo de ciertas condiciones (como permisos, roles, ACLs, etc) presentes en tiempo de ejecución.
Esto a menudo se denomina como autorización. La Autorización (y su prima la Autenticación, con la que suele colaborar) normalmente ha sido manejada por los middleware en las aplicaciones de Express tradicionales. Los Middleware son una buena elección de autenticación ya que elementos como la validación de tokens y asociación de propiedades a los objetos request no están fuertemente conectados con un contexto de ruta en particular (y su metadata).

Pero los middleware, por naturaleza, son tontos. No saben cuál manejador será ejecutado después de llamar a la función 'next()'. Por otra parte, los Guardianes tienen acceso a la instancia 'ExecutionContext' y, por lo tanto, saben exactamente qué es lo siguiente que será ejecutado. 

NODE_ENV=dev npm run start:dev
Configuración Server: 172.18.0.2

Comando para ver los puertos usados en MAC
lsof -i -P | grep -i listen

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

## Configuración de JWT

Para configurar el JWT, se debe crear un archivo llamado jwt.config.ts en la carpeta auth, con el siguiente contenido:

```bash
import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
}));
```