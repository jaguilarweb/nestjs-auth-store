import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

import { Public } from './auth/decorators/public.decorator';
import { ApikeyGuard } from './auth/guards/apikey.guard';

@UseGuards(ApikeyGuard) //Protege todos los endpoint de este controlador
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public() //Lo hace publico y no se ve afectado por el guardián.
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
