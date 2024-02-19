import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
dotenv.config({ path: path.resolve(process.cwd(), 'src/.env') });

// Types
import { EmailPayload } from '../types';

// To create test credentials for email testing
// const createTestCreds = async() => {
//     const creds = await nodemailer.createTestAccount();
//     console.log({creds});
// }
// createTestCreds();

const sendEmail = async (emailPayload: EmailPayload): Promise<void> => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 547,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        }
    } as SMTPTransport.Options);

    // Sending email
    transporter.sendMail(emailPayload, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
            console.log('Preview URL: ', nodemailer.getTestMessageUrl(info));
        }
    });
};

export default sendEmail;