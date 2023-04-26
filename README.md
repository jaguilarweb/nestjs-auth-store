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


## Postgres con Docker

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

`docker stop id_contenedor` detiene un contenedor en nuestra máquina.

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

La configuración para postgres queda de la siguiente forma:
```
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configService.postgres;
        return {
          type: 'postgress',
          host,
          port,
          username: user,
          password,
          database: dbName,
          synchronize: true, //Sincroniza las entidades para que cree las tablas en la base de datos.
          autoLoadEntities: true, //Carga automaticamente las entidades
        };
      },
    }),
  ],

```

Y como queremos que la configuración sea usable por todos los servicios y módulos de nuestra aplicación, lo incorporamos en los exports.

## Entidades (modelos)

Las entidades son clases que representan tablas de la base de datos. Estas clases deben extender de la clase Entity de TypeORM.

Para crear una entidad ejecutamos el comando `nest g class tasks/task.entity`.


## Patrones para manejar los datos con base a las entidades o modelos

### Active Record


### Repositories


## Mysql con Docker

Para configurar mysql como base de datos, podemos incluirla como servicio en el archivo docker-compose.yml.

También podemos incluir un manejador web, que en este caso será phpmyadmin dado que es uno de los más usados para mysql como mariadb.
La imagen de phpmyadmin y la documentación pueden consultarse en este [link](https://hub.docker.com/_/phpmyadmin?tab=description)

Debemos considerar que por convención, cuando configuramos los puertos en el archivo docker-compose.yml  se verá así:
  
  ```
      ports:
        - '8080:80'
  ```

Donde tendremos Puerto_HOST : Puerto_CONTAINER.

Tambien debemos instalar el cliente de mysql para node, mysql2. Revisar documentación en [link](https://github.com/sidorares/node-mysql2)

`npm install --save mysql2`

Agregar configuración al archivo config.ts y modificar la configuración den database.module

Configuración para mysql es igual que para postgres y solo cambia lo siguiente:

```
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configService.mysql;
        return {
          type: 'mysql',
        };
      },
    }),
  ],

```

## Migraciones

Las migraciones son una forma de versionar la base de datos, es decir, nos permiten llevar un control de las modificaciones que se realizan en la base de datos.

Esto lo estamos realizando, hasta ahora, con la característica de sincronize que tiene typeORM ( synchronize: true) que agregamos en el database.module.

Está técnica es recomendada solo para ambientes de desarrollo y testing.

En producción es una mala práctica y además es riesgosa, ya que cualquier cambio que se realice se traspasa a la base de datos, generando riesgo de corromperla.

Para realizar las migraciones, debemos instalar la dependencia de typeORM CLI.

Para el 2023 las indicaciones son diferentes al curso, pero los modulos de más adelante ven el update. En todo caso la documentación oficial en este punto es la siguiente:

[Documentación oficial](https://typeorm.io/#/migrations)

Lo primero es instalar la [cli](https://typeorm.io/using-cli#installing-cli),y para ello se debe tener instalado ts-node.

Agregar en el package.json el siguiente script:
```
"scripts": {
    ...
    "typeorm": "typeorm-ts-node-esm -d src/database/data-source.ts",
    "migrations:generate": "npm run typeorm  -- migration:generate",
}
```
o la alternativa **"typeorm": "typeorm-ts-node-commonjs"**. Pero como nestjs maneja módulos, se recomienda la primera.


La bandera -d corresponde a 'datasource', que es de donde debe leer la conexión y luego ponemos la dirección del archivo datasource.

El archivo data-source.ts debe contener la siguiente información:

```
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: 'postgres://root:123456@localhost:5432/my_db',
  logging: false,
  synchronize: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
});

```

Para realizar la configuración anterior, pero leyendo las variables de entorno, instalamos la dependencia de dotenv.

`npm i dotenv`




Posteriormente en la consola debemos ejecutar el siguiente comando:

`npm run migrations:generate ./src/database/migrations/init`

Nota: Si ya habíamos creado las tablas en la base de datos, debemos borrarlas antes de generar la migración, de lo contrario presentará un alerta.

Con lo anterior, se genera una migación en el directorio que definimos, el cual tiene la siguiente estructura:


```
import {MigrationInterface, QueryRunner} from "typeorm";


export class CreateTasksTable1629740000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
```

Como solo se ha generado una migración, aún no se refleja en la base de datos.

Comandos para correr las migraciones:
```
    "migrations:run": "npm run typeorm  -- migration:run",
    "migrations:drop": "npm run typeorm  -- schema:drop",
    "migrations:show": "npm run typeorm  -- migration:show",
    "migrations:revert": "npm run typeorm -- migration:revert"
```

Hay que tener mucho cuidado con el script (drop) ya que lo que hace es borrar todo dentro de la base de datos, ya que lo hace sobre el schema no sobre la migración.

El comando revert, vuelve hacia atrás los cambios.


Una vez que ya estamos funcionando mediante migraciones, debemos cambiar la configuración de la conexión a la base de datos de database.module. En ella debemos cambiar la opción de sincrinizar para ponerla en false.

```
synchronize: false,
```