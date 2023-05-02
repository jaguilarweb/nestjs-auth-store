import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

import { ApikeyGuard } from './auth/guards/apikey.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(ApikeyGuard)
  @Get('nuevo')
  newEndpoint(): string {
    return 'Soy un nuevo endpoint';
  }

  @Get('tasks')
  getTasks() {
    return this.appService.getTasks();
  }
}
