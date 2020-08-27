import * as nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
require('dotenv/config')

class EmailService {
    public transporter: Mail;

    constructor () {
      console.log(`Email: ${process.env.EMAIL}`)
      console.log(`Password: ${process.env.EMAIL}`)

      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
          user: process.env.EMAIL, // Basta dizer qual o nosso usuário
          pass: process.env.EMAIL_PASSWORD // e a senha da nossa conta
        }
      })
    }

    async sendMail (to:string, subject:string, message:string) : Promise<boolean> {
      const options = {
        from: process.env.EMAIL_NAME,
        to,
        subject,
        html: message
      }
      return await this.transporter.sendMail(options).then((res) => {
        console.log(res)
        return true
      }).catch((err) => {
        console.log(err)
        return false
      })
    }
}
export default new EmailService()
