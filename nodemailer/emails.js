import nodemailer from 'nodemailer'
import {emailVerifyTemplate} from "./template.js";
import  dotenv from 'dotenv'
dotenv.config()
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDER,
        pass: process.env.PASS,
    }
})
export const verificationEmail = async(email, token)=>{
    const mailOptions = {
        from: process.env.SENDER,
        to: email,
        subject: "Verify Email",
        html: emailVerifyTemplate(token),
    }

    await transporter.sendMail(mailOptions)
}