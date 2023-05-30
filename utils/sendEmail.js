const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "koverinv1997@meta.ua",
    pass: META_PASSWORD,
  },
});
// const emailOptions = {
//   from: "koverinv1997@meta.ua",
//   to: "koverinv1997@gmail.com",
//   subject: "Nodemailer test",
//   text: "Привет. Мы тестируем отправку писем!",
// };

const sendEmail = async (data) => {
  const email = { ...data, from: "koverinv1997@meta.ua" };
  await transporter.sendMail(email);
  return true;
};

module.exports = sendEmail;
