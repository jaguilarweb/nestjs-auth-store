import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private readonly apiKey: string,
    @Inject('TASKS') private readonly tasks: any[],
  ) {}

  getHello(): string {
    console.log(this.tasks);
    return `Hello world! ${this.apiKey}`;
  }
}
