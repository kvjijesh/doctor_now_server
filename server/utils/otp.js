import nodemailer from 'nodemailer'

export const sendOtp = async (name, email) => {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });
      const otp = `${Math.floor(1000 + Math.random() * 90000)}`;
      const mailoption = {
        from: "kvjijesh2@gmail.com",
        to: email,
        subject: " OTP Verification mail",
        text: `hello ${name} your otp ${otp}`,
      };
      transporter.sendMail(mailoption, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("email has been set", info.response);
        }
      });
      return otp;
    } catch (error) {
      res.status(500).send({message:`${error}`})
    }
  };