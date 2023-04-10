const nodemailer = require('nodemailer')
require('dotenv').config()
const mail = {
    name: 'Lightning.io Support Team',
    user: process.env.MAIL,
    pass: process.env.MAIL_PASS
}

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: mail.user,
        pass: mail.pass,
    },
});

const mailer = async (receiver, token , subject,isDelete,isRecover,isPerso,conf) => {
    try {
        const info = await transporter.sendMail({
            from: `"${mail.name}" <${mail.user}>`,
            to: receiver.mail,
            subject: subject || 'support mail',
            text: "Hello "+receiver.username,
            html: `
            <table border="0" cellpadding="0" cellspacing="0" style="padding-top:16px;background-color:#f1f1f1;font-family:Verdana,Arial,sans-serif;color:#454748;width:100%;border-collapse:separate"><tbody><tr><td align="center">
<table border="0" cellpadding="0" cellspacing="0" width="590" style="padding:24px;background-color:white;color:#454748;border-collapse:separate">
<tbody>
    
    <tr>
        <td align="center" style="min-width:590px">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:white;padding:0;border-collapse:separate">
                <tbody><tr><td valign="middle">
                    <span style="font-size:10px">Querido usuario</span><br>
                    <span style="font-size:20px;font-weight:bold">
                        ${receiver.username}
                    </span>
                </td><td valign="middle" align="right">
                    
                </td></tr>
                <tr><td colspan="2" style="text-align:center">
                  <hr width="100%" style="background-color:rgb(204,204,204);border:medium none;clear:both;display:block;font-size:0px;min-height:1px;line-height:0;margin:4px 0px 32px 0px">
                </td></tr>
            </tbody></table>
        </td>
    </tr>
    
    <tr>
        <td style="min-width:590px">
            <div style="font-family:sans-serif;font-size:15px;color:#4a4a4a;padding:10px;margin:0 auto;min-width:224px;max-width:600px">
  <div style="font-size:13px;font-family:&quot;Lucida Grande&quot;,Helvetica,Verdana,Arial,sans-serif;margin:0;padding:0">
    <div style="font-size:13px;font-family:&quot;Lucida Grande&quot;,Helvetica,Verdana,Arial,sans-serif;margin:0;padding:10px;text-align:center">
      <a href="https://www.vauxoo.com/" style="text-decoration:none;background-color:transparent;color:#7f0b1e;margin:0;padding:0" target="_blank" >
        
      </a>
    </div>
  </div>
  <div style="font-size:13px;font-family:&quot;Lucida Grande&quot;,Helvetica,Verdana,Arial,sans-serif;margin:0;padding:10px;border-radius:5px">
<table style="border-collapse:collapse;padding:0;border:0;width:100%;font-size:15px;border-spacing:0;color:#4a4a4a;margin:0" width="100%">
  <tbody><tr style="margin:0;padding:0">
    <td style="margin:0;text-align:left;padding:0" align="left">
      <p style="font-size:13px;font-family:&quot;Lucida Grande&quot;,Helvetica,Verdana,Arial,sans-serif;padding:0;margin:15px 0">Hola,</p>
    </td>
    ${isPerso?`<img src="${conf.url}" />`:`
    <td style="margin:0;text-align:right;padding:0" align="right">
      <div style="font-size:13px;font-family:&quot;Lucida Grande&quot;,Helvetica,Verdana,Arial,sans-serif;margin:0;padding:10px 0">
        <a href="https://localhost:3000/api/v1/${isDelete?'confirm-action':isRecover?'recover':'verify'}?token=${token}" style="text-decoration:none;background-color: #008ccb;color:#fff;margin:0;display:inline-block;border: #01557b;border-radius:5px;padding:10px 15px;margin-right:5px" target="_blank">${isDelete?'Confirm Delete account':isRecover?'Recovery password':'Verify account'}</a>
      </div>
    </td>
    `}
  </tr>
</tbody></table>

<p style="font-size:13px;font-family:&quot;Lucida Grande&quot;,Helvetica,Verdana,Arial,sans-serif;padding:0;margin:15px 0">${isDelete?"Se a solicitado borrar este usuario, si no fue usted, cambie su contraseña y no acepte esta accion, si usted solicito eliminar su usuario, confirme la accion, no hay forma de recuperar su informacion.":isRecover?"Para recuperar tu usuario, te llevaremos a un formulario, llena los datos y te proveeremos de una contraseña provicional para que tengas acceso a tu cuenta, ahi podras cambiar tu contraseña a una de tu preferencia.":isPerso?`${conf.message}`:"Para poder usar su cuenta de manera libre, debe verificar su correo, esto ayudara en el futuro a proteger su cuenta en caso de perder el acceso."}
</p><p style="font-size:13px;font-family:&quot;Lucida Grande&quot;,Helvetica,Verdana,Arial,sans-serif;padding:0;margin:15px 0">
  Saludos,
</p><p style="font-size:13px;font-family:&quot;Lucida Grande&quot;,Helvetica,Verdana,Arial,sans-serif;padding:0;margin:15px 0;color:#979797">
  --<br style="margin:0;padding:0">
  <strong style="font-weight:bolder;margin:0;padding:0">Josue Morales [Lightning.io]</strong><br style="margin:0;padding:0">
  Correo: <a href="mailto:thejosuescript@gmail.com" target="_blank">thejosuescript@gmail.com</a><br style="margin:0;padding:0"></p>
  </div>
  <div style="font-size:11.25px;font-family:&quot;Lucida Grande&quot;,Helvetica,Verdana,Arial,sans-serif;margin:0;padding:0;color:#979797;margin-top:15px">
    <div style="font-size:13px;font-family:&quot;Lucida Grande&quot;,Helvetica,Verdana,Arial,sans-serif;padding:0;height:1px;background-color:#979797;margin:15px 0;border-radius:5px;margin-top:0"></div>
    <table style="border-collapse:collapse;padding:0;border:0;width:100%;margin:10px 0;border-spacing:0;font-size:11.25px;color:#979797" width="100%">
      <tbody style="margin:0;padding:0">
        <tr style="margin:0;padding:0">
          
          
        </tr>
        <tr style="margin:0;padding:0">
          
          <td style="margin:0;padding:5px 0;border:0;text-align:right" align="right"></td>
        </tr>
      </tbody>
    </table>
    <p style="font-size:13px;font-family:&quot;Lucida Grande&quot;,Helvetica,Verdana,Arial,sans-serif;margin:0;padding:0;text-align:center">
      Powered by<br style="margin:0;padding:0">
      <a href="#" style="color: #4b676b;text-decoration: none;font-size: 1.4rem;font-family: 'Lato';font-weight: 700;" target="_blank">Lightning.<span style="
    color: #008ccb;
">io</span></a>
    </p>
  </div>
</div>
    
        </td>
    </tr>
    
    <tr>
        
    </tr>
</tbody>
</table>
</td></tr>

<tr><td align="center" style="min-width:590px"> 
</td></tr>
</tbody></table>
            `,
        });
        return info
    } catch (error) {
        throw error
    }
}
module.exports = mailer