import nodemailer from 'nodemailer';
import 'dotenv/config';

 class EmailSend {
    constructor(){  
         this.data='ankul';
            this.transporter = nodemailer.createTransport({
            pool :true, 
            host: process.env.host_email,
            port: process.env.email_port,
            secure: true, // true for 465, false for other ports
            requireTLS:true,
            auth: {
            user: process.env.email,
            pass: process.env.email_pass
            },
        });
    }
    registrationEmail=(to,emailBody,template)=>{
        const mailOptions={
            from:'"Customer Register" <ankul@pihusoft.live>',
            to:to,
            subject:'email testing',
            html: template
        }
        this.transporter.sendMail(mailOptions,(err,info)=>{
            if(err){
                return createError(412, err.message)
            }else{
                return {status:1,message:'regisration email send!'};
            }
        })

    }
 /*static mySend= ()=> {
 let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    requireTLS:true,
    auth: {
      user: 'alastair123789@gmail.com',
      pass: 'alastair@123'
    },
  });*/
   /*let transporter = nodemailer.createTransport({
    host: "server165.web-hosting.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    requireTLS:true,
    auth: {
      user: 'ankul@pihusoft.live',
      pass: 'lkankul@12345'
    },
  });

}*/

}
export default new EmailSend();