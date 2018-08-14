import nodemailer from "nodemailer";

const poolConfig = {
  pool: true,
  service: "gmail",
  secure: true, // use TLS
  auth: {
    user: "thelonewolf.init@gmail.com",
    pass: "xxxxx"
  }
};

export const transporter = nodemailer.createTransport(poolConfig);
