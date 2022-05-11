import nodemailer from 'nodemailer';
import { MailAdapter, sendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "70d15bb060d619",
      pass: "721a59ab5cdc5e"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: sendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Rafael Pablo M <rafaelmassocato@gmail.com>',
            subject,
            html: body,
        });
    }
}