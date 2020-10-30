const nodemailer = require('nodemailer');
const pug = require('pug');
const path = require('path');
const htmlToText = require('html-to-text');

module.exports = class SendEmail {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name;
    this.url = url;
    this.from = 'DevCoach <noreply@devcoach.org>';
  }

  sendTransport() {
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        service: 'sendGrid',
        secureConnection: true,
        ports: 465,
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
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
      path.join(__dirname, `../views/emails/${template}.pug`),
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

  // send user welcome message
  async sendWelcome() {
    await this.send('welcome', 'Welcome to DevCoach');
  }

  // send reset password message
  async passwordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid only for 10 minutes)'
    );
  }
};
