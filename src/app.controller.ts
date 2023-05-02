import { Controller, Get, UseGuards, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';

import { ApikeyGuard } from './auth/guards/apikey.guard';

@UseGuards(ApikeyGuard) //Protege todos los endpoint de este controlador
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @SetMetadata('isPublic', true) //Lo hace publico y no se ve afectado por el guardián.
  getHello(): string {
    return this.appService.getHello();
  }

  /* @UseGuards(ApikeyGuard) */ //Protege solo el endpoint
  @Get('nuevo')
  newEndpoint(): string {
    return 'Soy un nuevo endpoint';
  }

  @Get('tasks')
  getTasks() {
    return this.appService.getTasks();
  }
}
