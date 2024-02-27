import { StatusCodes } from 'http-status-codes';
import nodemailer from 'nodemailer'

export const SendEmail = async (req,res,next)=>{
    try {
        const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "ngugimaina2019@gmail.com",
    pass: "rdou nawj wayu bygn",
  },
});
const {order} = req;

const html = `
<h1>you payment have been received</h1>
<a  href =${order.receipt_url} download> click here to view receipt</a>
<p>Your order is being prepared </p>
<p>thank you for shopping with us </p>
`
const mailOptions = {
  from: "Fresh grub kenya",
  to: "1903627@students.kcau.ac.ke",
  subject: "Fresh grub kenya",
  text: "Receipt and invoice information",
  html
};
 await transporter.sendMail(mailOptions);
return res.status(StatusCodes.OK).json({ success: true, order });

    } catch (error) {
        next(error)
    }
}
