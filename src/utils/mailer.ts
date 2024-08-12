// import nodemailer from "nodemailer";
// import User from "@/models/userModel";
// import bcrypt from "bcrypt";

// const sendEmal = async ({ email, emailType, userId }: any) => {
//   try {
//     //create hashe token
//     const hashedToken = await bcrypt.hash(userId.toString(), 10);

//     if (emailType === "verify") {
//       await User.findByIdAndUpdate(
//         userId,
//         {
//           verifyToken: hashedToken,
//           verifyTokenExpiry: Date.now() + 10 * 60 * 1000,
//         },
//         { new: true, runValidators: true }
//       );
//     } else if (emailType === "RESET") {
//       await User.findByIdAndUpdate(
//         userId,
//         {
//           forgotPasswordToken: hashedToken,
//           forgotPasswordTokenExpiry: Date.now() + 10 * 60 * 1000,
//         },
//         { new: true, runValidators: true }
//       );
//     }

//     //send email
//     var transport = nodemailer.createTransport({
//       host: "sandbox.smtp.mailtrap.io",
//       port: 2525,
//       auth: {
//         user: "4a3b2ef00d579c",
//         pass: "4318dec2b2c7df",
//         // Todo: add these credentials in .env file
//       },
//     });

//     const mailOptions = {
//       form: "devctme@gmail.com",
//       to: email,
//       subject:
//         emailType === "verify" ? "Verify your email" : "Reset your password",
//       html: `
//       <p> Click <a href="${
//         process.env.DOMAIN
//       }/verifyemail?token=${hashedToken}">here</a> to ${
//         emailType === "verify" ? "verify" : "reset"
//       } or copy and paste this link in your browser. <br/> ${
//         process.env.DOMAIN
//       }/verifyemail?token=${hashedToken} </p>
//       `,
//     };

//     const mailresponse = await transport.sendMail(mailOptions);

//     return mailresponse;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };

// export default sendEmal;
