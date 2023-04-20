<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Curso NESTJS Persistencia de Datos con TypeORM

## Descripción
Este curso incorpora la persistencia de datos al store que hemos ido creando en la saga de 3 cursos de Nestjs, ofrecidos por Platzi.


## Herramientas

- NodeJS
- NestJS
- TypeORM
- MySQL y/o Postgress
- Docker
- Postman


## Docker

Es un contenedor con el cual correremos las bases de datos, sin necesidad de instalarlas en nuestra sistema local y así evitar lidiar problemas de configuración o drivers.

Los contenedores no tienen estado, por tanto, cuando son apagados se pierden los datos (no tiene persistencia).

Si se desea agregar persistencia, se debe agregar y especificar un volumen en el archivo 'docker-compose.yml'.

Importante es ignorar el archivo para que no se guarde en Guthub.

Comandos
- `docker-compose up -d nombre-servicio` : Para levantar el contenedor
- `docker-compose down` : Para detener el contenedor
- `docker-compose ps`: Para verificar que el contenedor esté corriendo.

- `docker-compose logs -f nombre-servicio` : Muestra los logs y podemos saber detalles del servicio que se está ejecutando y si hay errores.

-`docker-compose exec postgres_db bash`: Ingresa al contenedor mediante la terminal.

Cuando hemos ingresado al contenedor, podemos ejecutar el comando de psql para ingresar a la base de datos que hemos creado (la que definimos en el archivo yml).

`psql -h localhost -d nombre-database -U usuario-database`

Ejemplo:
`psql -h localhost -d my_db -U root`

Comandos psql

Para ver relaciones de las tablas
my_db=# `\d+`

Para salir de la base de datos
my_db=# `\q`

Salir del contenedor
`exit`

Para interactuar con la base de datos también podemos utilizar un administrador web, por el cual podemos interactura con la base de datos mediante el browser.

Una vez que configuramos el servicio en nuestro archivo docker-compose.yml, podemos ir al browser y abrir el servicio utilizando el puerto fijado. En este caso **http://localhost:5050/** y la aplicación ya está desplegada.

Luego ingresamos con los datos de accesos definidos en nuestras variables en docker-compose.

Ahora necesitamos crear una conexión directa a la ip donde está corriendo postgres.

Manteniendo seleccionado 'Servers' que está desplegado en el menú izquierdo, vamos al menú de opciones superior.

Luego en Objeto -> Crear (o Registrar) -> Servidor

Se abre una ventana que pedirá el nombre de la base de datos, y en ella debemos abrir la pestaña de conexión para configurar la conexión.

Como nos pide la ip, debemos averiguar cual es la ip que docker le dio al contenedor con la base de datos.

Para lo anterior, ejecutamos en nuestra terminal el comando `docker ps` que nos presentará información de los contenedores incorporando el CONTAINER ID. Ese dato lo requerimos para posteriormente identificar la ip.

Para obtener la ip corremos el comando `docker inspect ID-Contenedor` entonces nos arrojará la información de detalle del contenedor cuya ID obtuvimos. La ip es la que aparece como "IPAddress": "172.19.0.2", y es ella la que incorporamos en el formulario del administrador de base de datos web.

Luego llenamos el fomulario y la parte que decía Maintenance database la dejamos como 'postgres'.

Diferenciar comando:

`docker ps` nos presenta todos los contenedores que están corriendo en la maquina, y `docker-compose ps` nos indica los contenedores que correspondan al proyecto.

## node-postgres

Utilizaremos el driver oficial de node para postgres, cuya documentación encontraremos en [node-postgres](https://node-postgres.com/).

Lo primero que debemos realizar es la instalación de las dependencias, tanto de pg como del tipado ya que estamos trabajando con Typescript.

- `npm install pg`
- `npm install @types/pg -D`

Listas las intalaciones haremos las conexiones en el archivo app.module.

Para probar ingresamos datos manualmente a la base de datos.
Luego al ejecutar la aplicacion podemos ver en la terminal esta información:

```
null
[
  { id: 1, title: 'Task 2', completed: false },
  { id: 2, title: 'Task 1', completed: false }
]
```

Con ello podemos comprobar que tenemos conexión real a la base de datos.


## ORM (Object Relational Mapping)

Es una técnica de programación que permite mapear objetos de una aplicación a tablas de una base de datos relacional.
Es decir, nos ayuda a manipular y consultar la información almacenada  dentro de una base de datos usando programación orientada a objetos.

Un ORM se encarga de la conexión y de manejar todo con base en modelos y entidades. Con ello, no es requerido ejecutar código SQL directamente en nuestro código ya que el ORM nos otorga métodos.

En este caso utilizaremos TypeORM, el cual nos permite trabajar con bases de datos relacionales y no relacionales.

TyperORM está desarrollado con Typescript https://typeorm.io

Para instalar TypeORM ejecutamos el comando `npm install --save @nestjs/typeorm typeorm`.

Luego realizamos la configuración, que en nuestro caso la hacemos en el módulo de base de datos (database.module.ts) que habíamos creado previamente.

Importamos el TypeORM Module, y como es un módulo lo incorporamos en los imports.
Y como queremos que la configuración sea usable por todos los servicios y módulos de nuestra aplicación, lo incorporamos en los exports.

