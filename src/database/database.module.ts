import { Module, Global } from '@nestjs/common';

//Trasladamos estos datos desde app.module para que esten disponibles globalmente.
const API_KEY = '12443422';
const API_KEY_PROD = 'PROD3254642';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
