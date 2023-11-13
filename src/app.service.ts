import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { Options } from 'nodemailer/lib/smtp-transport';
import configuration from './config/configuration';

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}
  async sendMail(to: string, link: string) {
    await this.setTransport();
    this.mailerService
      .sendMail({
        transporterName: 'gmail',
        to: to,
        from: 'noreply@nestjs.com',
        subject: 'Verify account',
        text: `Your verification like is : ${link}`,
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private async setTransport() {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      configuration().mail.client_id,
      configuration().mail.client_secret,
      'https://developers.google.com/oauthplayground',
    );

    oauth2Client.setCredentials({
      refresh_token: configuration().mail.refresh_token,
    });

    const accessToken: string = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject('Failed to create access token');
        }
        resolve(token);
      });
    });

    const config: Options = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: configuration().mail.email,
        clientId: configuration().mail.client_id,
        clientSecret: configuration().mail.client_secret,
        accessToken,
      },
    };
    this.mailerService.addTransporter('gmail', config);
  }
}
