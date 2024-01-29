import { NextFunction, Request, Response } from "express";
import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import dotenv from "dotenv";
import { createError } from "../../error";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  port: 465,
  host: "smtp.gmail.com",
});

export const generateOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.app.locals.OTP = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
    digits: true,
  });
  const { email, name } = req.query;
  const verifyOtp = {
    to: email,
    subject: "Account Verification OTP",
    html: `
        <div style="font-family: Poppins, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
    <h1 style="font-size: 22px; font-weight: 500; color: #007AFF; text-align: center; margin-bottom: 30px;">Verify Your  SentinelSafe Account</h1>
    <div style="background-color: #FFF; border: 1px solid #e5e5e5; border-radius: 5px; box-shadow: 0px 3px 6px rgba(0,0,0,0.05);">
        <div style="background-color: #007AFF; border-top-left-radius: 5px; border-top-right-radius: 5px; padding: 20px 0;">
            <h2 style="font-size: 28px; font-weight: 500; color: #FFF; text-align: center; margin-bottom: 10px;">Verification Code</h2>
            <h1 style="font-size: 32px; font-weight: 500; color: #FFF; text-align: center; margin-bottom: 20px;">${req.app.locals.OTP}</h1>
        </div>
        <div style="padding: 30px;">
            <p style="font-size: 14px; color: #666; margin-bottom: 20px;">Dear ${name},</p>
            <p style="font-size: 14px; color: #666; margin-bottom: 20px;">Thank you for creating a  SentinelSafe account. To activate your account, please enter the following verification code:</p>
            <p style="font-size: 20px; font-weight: 500; color: #666; text-align: center; margin-bottom: 30px; color: #007AFF;">${req.app.locals.OTP}</p>
            <p style="font-size: 12px; color: #666; margin-bottom: 20px;">Please enter this code in the  SentinelSafe app to activate your account.</p>
            <p style="font-size: 12px; color: #666; margin-bottom: 20px;">If you did not create a  SentinelSafe account, please disregard this email.</p>
        </div>
    </div>
    <br>
    <p style="font-size: 16px; color: #666; margin-bottom: 20px; text-align: center;">Best regards,<br>The  SentinelSafe Team</p>
</div>
`,
  };
  console.log(email);
  transporter.sendMail({ ...verifyOtp, to: email as string }, (err) => {
    if (err) return next(err);
    return res.status(200).send({ message: "OTP sent" });
  });
};

export const verifyOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { code } = req.query;
  if (parseInt(code as string) === parseInt(req.app.locals.OTP as string)) {
    req.app.locals.OTP = null;
    req.app.locals.resetSession = true;
    return res.status(200).send({ message: "OTP verified" });
  }
  return next(createError(403, "Wrong OTP"));
};
