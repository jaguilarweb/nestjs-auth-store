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


## Tipado en Config

A medida que tu aplicación acumule más y más variables de entorno, puede volverse inmanejable y es propenso a tener errores el no recordar sus nombres o escribirlos mal.

Seguriza tu lista de variables de entorno de manera que evites errores que son difíciles de visualizar.

**Tipado de las variables**

1. Archivo de tipado de variables
Crea un archivo al que denominaremos config.ts que contendrá el tipado de tu aplicación con ayuda de la dependencia @nestjs/config.

Importa registerAs desde @nestjs/config que servirá para crear el tipado de datos. Crea un objeto con la estructura de datos que necesita tu aplicación. Este objeto contiene los valores de las variables de entorno tomados con el objeto global de NodeJS, process.

2. Importación del tipado de datos
Importa el nuevo archivo de configuración en el módulo de tu proyecto para que este sea reconocido.

3. Tipado de variables de entorno
Es momento de utilizar este objeto que genera una interfaz entre nuestra aplicación y las variables de entorno para no confundir el nombre de cada variable.

Observa la configuración necesaria para inyectar y tipar tus variables de entorno. Ahora ya no tendrás que preocuparte por posibles errores al invocar a una de estas variables y evitar dolores de cabeza debugueando estos errores.


## Validación de esquemas en .envs con Joi

Joi es una biblioteca de validación de esquemas para JavaScript. Permite definir un esquema que describe la forma de un objeto JavaScript. Luego, puede usar este esquema para validar objetos JavaScript para asegurarse de que tengan la forma esperada.

Las variables de entorno son sensibles, pueden ser requeridas o no, pueden ser un string o un number.

Para validar las variables de entorno, debemos instalar la dependencia joi con el siguiente comando `npm install joi --save`. La misma nos dará las herramientas para realizar validaciones de nuestras variables de entorno.

Importa Joi en el módulo de tu aplicación y a través de la propiedad validationSchema del objeto que recibe el ConfigModule crea el tipado y las validaciones de tus variables de entorno.

Lo que hace Joi es asegurar que, en el archivo .env, existan las variables de entorno indicadas dependiendo si son obligatorias o no, además de validar el tipo para no ingresar un string donde debería ir un number.

En equipos de trabajo profesional, quienes suelen desplegar las aplicaciones en los entornos es el equipo DevOpsy ellos no necesariamente saben qué variables de entorno necesita tu aplicación y de qué tipo son. Gracias a esta configuración, tu app emitirá mensajes de error claros por consola cuando alguna variable no sea correcta.

## Integrando Swagger y PartialType con Open API

**Swagger** es un reconocido set de herramientas para la documentación de API Rest. Instala las dependencias necesarias con el comando `npm install --save @nestjs/swagger swagger-ui-express` y configura el archivo main.ts.

Setea el título, descripción y versión de tu documentación. Lo más importante es la URL para acceder a la misma.

Levanta el servidor con `npm run start:dev` y accede a localhost:3000/docs para visualizar la documentación autogenerada que mapea automáticamente todos los endpoints de tu aplicación.

### Tipado de la documentación

Consideraciones previas es familiarizarse con las especificaciones OpenAPI, que es una especificación para escribir una buena documentación para API's REST. (Link)[https://spec.openapis.org/oas/v3.1.0]
También se encuentra referencia en la documentación oficial de NestJS (Link)[https://docs.nestjs.com/openapi/introduction]

La documentación autogenerada por Swagger es bastante simple, puedes volverla más completa tipando los datos de entrada y salida de cada endpoint gracias a los DTO.

Busca el archivo nest-cli.json en la raíz de tu proyecto y agrega el siguiente plugin:
  
  `"plugins": ["@nestjs/swagger/plugin"]`

A continuación, prepara tus DTO.
Lo más relevante aquí es importar PartialType y OmitType desde @nestjs/swagger en lugar de importarlo desde @nestjs/mapped-types. Coloca también el decorador @ApiProperty() en cada una de las propiedades que el DTO necesita.

De esta manera, observarás en la documentación que indica el tipo de dato que requiere cada uno de tus endpoints.

**NOTA**
Para que Swagger encuentre tus DTOs y Entities es necesario tener los archivos con extension .dto.ts y .entity.ts repectivamente.


## Extender la documentación (Personalizarla)

La documentación automática que genera NestJS y Swagger es muy fácil de implementar y otorga una buena base. La documentación de tu aplicación puede ser aún más completa y detallada.

Varios decoradores te servirán para ampliar la documentación de tu API.

### Descripción de las propiedades
En tus DTO, puedes dar detalle sobre qué se espera recibir en cada propiedad de tus endpoints gracias al decorador @ApiProperty()


### Descripción de los controladores
Puedes agrupar los endpoints en la documentación por controlador con el decorador @ApiTags() y describir, endpoint por endpoint, la funcionalidad de cada uno con el decorador @ApiOperation().


<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>
