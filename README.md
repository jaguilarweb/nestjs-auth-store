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

