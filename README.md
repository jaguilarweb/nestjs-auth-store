# Curso NESTJS Programación Modular, Documentación con Swagger y Deploy

## Descripción
Este curso incorpora la buenas prácticas como es separar la programacion en diferentes módulos, para que cuando escale la aplicación sea más comprensible y mantenible.


## BUG en Visual Studio

En algún momento del desarrollo, el comando nest dejó de funcionar en la terminal.
Si bien es posible correr el programa con nest start y consultar cosas como `nest --help`o `nest --version`no pude generar los otros componentes.

Una forma de resolverlo fue cambiar el comande 'nest' por '@nestjs/cli', ejemplo:
- `@nestjs/cli g mo nombre-modulo`



## Módulos


## Inyección de dependencias

Los providers pueden ser clases o valores.

**Providers**

El que usamos mas a menudo es el UseClass, se usa por defecto.

Ejemplo en el módulo users:
```
  providers: [UsersService],

```

Equivale a :

```
  providers: [
    {
      provide: UsersService,
      useClass: UsersService,
    },
  ],

```

Pero hay otros,ejemplo:

- Use Value: es un valor. Se usa por ejemplo para testing y conexiones.
- Use Factory: es una función que devuelve un valor. Se usa por ejemplo para crear una conexión a la base de datos.

NestJS permite inyecciones de servicios o datos que necesiten de alguna petición HTTP o algún proceso asíncrono.

**Inyecciones Asíncronas**
El tipo de inyección useFactory permite que realices un proceso asíncrono para inyectar un servicio o datos provenientes de una API.

Es decir puedes conectar tu Api a otra (una externa).

A partir de NestJS v8, el servicio HttpService importado desde @nestjs/common fue deprecado. Instala la dependencia @nestjs/axios e impórtalo desde ahí. No deberás realizar ningún otro cambio en tu código. También debes asegurarte de importar el módulo HttpModule desde la misma dependencia.

`npm i @nestjs/axios`
`npm i axios`


## Global Module

Al desarrollar una aplicación con NestJS, existen necesidades de importar módulos cruzados o de importar un mismo servicio en varios módulos. Lo anterior, hace que la cantidad de imports en cada módulo crezca y se vuelva complicado de escalar.

Los módulos globales son módulos que se importan automáticamente en todos los módulos de la aplicación, sin necesidad de importarlos explícitamente. Esto es útil para importar módulos que se utilizarán en la mayoría de los módulos de la aplicación, como el módulo HttpModule.

Es importante no abusar de esta característica y no tener más de un módulo global para controlar las importaciones. Pueden ocurrir errores de dependencias circulares que suceden cuando el Módulo A importa al Módulo B y este a su vez importa al Módulo A. El decorador @Global() te ayudará a resolver estos problemas.

## Modulo de configuración

El manejo de variables de entorno en NestJS se realiza de una forma muy sencilla. Instala la dependencia @nestjs/config e importa el módulo ConfigModule en el módulo principal de tu aplicación.

Esta dependencia tiene por detrás el paquete dot.env para manejar variables de entorno con node.

Es muy importante que el archivo de variables de entorno esté en el directorio raíz, es decir fuera de 'src', y al mismo nivel de package json.


## Configuración por ambientes

Una aplicación profesional suele tener más de un ambiente. Ambiente local, ambiente de desarrollo, ambiente de pruebas, producción, entre otros, dependiendo la necesidad del equipo y de la organización. Veamos cómo puedes administrar N cantidad de ambientes en NestJS.

Configuramos la aplicación para intercambiar fácilmente entre diversos ambientes (dinámicamente), cada uno con su propia configuración.

NODE_ENV es una variable de entorno propia de NodeJS y del framework Express que se encuentra preseteada en tu aplicación.


Rin with NODE_ENV // 👈
NODE_ENV=prod npm run start:dev
NODE_ENV=stag npm run start:dev

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
