import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';

//Trasladamos estos datos desde app.module para que esten disponibles globalmente.
const API_KEY = '12443422';
const API_KEY_PROD = 'PROD3254642';

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'my_db',
  password: '123456',
  port: 5432,
});

client.connect();

/* client.query('SELECT * FROM tasks', (err, res) => {
  console.error(err);
  console.log(res.rows);
}); */

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useValue: client,
    },
  ],
  exports: ['API_KEY', 'PG'],
})
export class DatabaseModule {}
