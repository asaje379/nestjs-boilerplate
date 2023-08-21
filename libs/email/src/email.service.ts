import { Injectable } from '@nestjs/common';
import { CreateEmail } from './email.typings';
import { createTransport } from 'nodemailer';
import { Env } from '@app/shared';
import { parseEmailTemplate } from './email.parser';

@Injectable()
export class EmailService {
  async sendEmail(data: CreateEmail) {
    const { host, user, pass } = data;

    const transport = createTransport({
      host: host ?? Env.email.host,
      port: 465,
      secure: true,
      auth: {
        user: user ?? Env.email.user,
        pass: pass ?? Env.email.pass,
      },
    });

    return await transport.sendMail({
      from: data.from ?? Env.email.user,
      to: data.to,
      html: data.content ?? (await parseEmailTemplate('test', data.data ?? {})),
      subject: data.subject ?? '',
      ...(data.cc ? { cc: data.cc } : {}),
      ...(data.attachments ? { attachments: data.attachments } : {}),
    });
  }
}
