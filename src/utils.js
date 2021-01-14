require('dotenv').config({ path: "./src/.env" });
import { adjectives, nouns } from './words';
import nodemailer from 'nodemailer';
import mgTransport from 'nodemailer-mailgun-transport';
import jwt from 'jsonwebtoken';



export const generateSecret = () => { 
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
}

export const sendSecretMail = (address, secret) => { 

    const email = {
        from: "master@semicolon.com",
        to: address,
        subject: "세미콜론으로 부터온 로그인 비밀번호!",
        html: `<h3>세미콜론에 회원가입해주셔서 감사합니다.</h3> <br/>  <strong>${secret}</strong> <br><br> <h4>코드를 복사해서 회원가입을완료해주세요.</h4>`
    }
    return sendMail(email);
}

export const sendMail = email => { 
    const options = {
        auth: {
            api_key: process.env.API_KEY,
            domain:process.env.DOMAIN
        },
    }
    const client = nodemailer.createTransport(mgTransport(options));
    return client.sendMail(email);
};

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);