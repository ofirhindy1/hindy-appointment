const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail=(email,name)=>{
    sgMail.send({
        to:email,
        from:'ofirfiv@gmail.com',
        subject:'Thanks for joining our services',
        text:`welcome to our web app ${name}, we are her by your side!`
    })
}
const meetingSent =(email,date,comment,group)=>{
    sgMail.send({
        to:email,
        from:'ofirfiv@gmail.com',
        subject:'Thanks setting a meeting',
        text:`You asked for ${date},\n Group/Alone: ${group},\n Special comments: ${comment}`
    })
}
module.exports= {
    sendWelcomeEmail,
    meetingSent
}