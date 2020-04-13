const nodemailer = require('nodemailer');
const pug = require('pug');
const path = require('path');
const htmlToText = require('html-to-text');

module.default = class SendEmail {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = 'DevCoach <noreply@devcoach.org>';
  }

  sendTransport() {
    if (process.env.NODE_ENV === 'production') {
      return 1;
    }

    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 2525,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
      }
    });
  }

  async send(template, subject) {
    //render html template
    const html = pug.renderFile(
      path.join(__dirname, `views/emails/${template}.pug`),
      {
        firstName: this.firstName,
        url: this.url,
        subject
      }
    );
    //email options
    const message = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html)
    };

    //create transport and send email
    await this.sendTransport().sendMail(message);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to DevCoach');
  }
};
