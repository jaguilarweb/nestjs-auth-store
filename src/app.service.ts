import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { Client } from 'pg';

@Injectable()
export class AppService {
  constructor(
    /*  @Inject('API_KEY') private readonly apiKey: string, */
    @Inject('PG') private clientPg: Client,
    @Inject('TASKS') private readonly tasks: any[],
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  getHello(): string {
    /* console.log(this.tasks); */
    const apiKey = this.configService.apiKey;
    const db_name = this.configService.database.db_name;
    /* const db_name = this.config.get('DATABASE_NAME'); */
    return `Hello world! ${apiKey} ${db_name}`;
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }
}
