import { DataSource } from 'typeorm';

//Esta es la conexión para el cliente de comandos y para correr migraciones.
//Es diferente a la conexión a la base de datos que está configurada en database.module.

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: 'postgres://root:123456@localhost:5432/my_db',
  logging: false,
  synchronize: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
});

/* export const AppDataSource = new DataSource({
  type: 'postgres',
  port: parseInt(configService.get('DATABASE_PORT'), 10),
  host: configService.get('DATABASE_HOST'),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  logging: configService.get('ORM_LOG'),
  synchronize: configService.get('ORM_SYNC'),
  entities: [configService.get('TYPEORM_ENTITIES')],
  migrations: [configService.get('TYPEORM_MIGRATIONS')],
}); */

//Se puden definir tantos datasource como sean necesarios.
/* const MysqlDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "test",
  password: "test",
  database: "test",
  entities: [
      // ....
  ],
})
 */

//TODO: Revisar la configuración en la documentacion oficial
//https://typeorm.io/data-source
//Ejemplo https://platzi.com/comentario/4545009/
