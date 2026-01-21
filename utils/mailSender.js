const mail = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config();

exports.mailSender = async(Data) => {
    try{
        const transporter = mail.createTransport({
        service : 'gmail',
        auth:{
             user : process.env.EMAIL,
             pass : process.env.PASSWORD,
          } 
        })

    const send = {
        from : process.env.EMAIL,
        to : Data.email,
        subject : Data.subject,
        text : Data.text
    }  

    const sent = await transporter.sendMail(send)

    if(sent){
        return true;
    }

    }catch(error){
        console.error(error.message)
    }
}
