import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('send-mail')
  async persistEvent(@Payload() data, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    // await this.appService.persistLog(data)
    console.log('receive message', data);
    await this.appService.sendMail(data.to, data.link);
    channel.ack(originalMessage);
  }
}
