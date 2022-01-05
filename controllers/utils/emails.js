const nodemailer = require("nodemailer");
const nodemailMailGun = require("nodemailer-mailgun-transport");

const emailAuth = {
  auth: {
    api_key: process.env.MAIL_API,
    domain: process.env.MAIL_DOMAIN,
  },
};

let transporter = nodemailer.createTransport(nodemailMailGun(emailAuth));

let mailContent = {
  from: "shashiprabhawijemanna@gmail.com",
  to: "",
  subject: "Item Reached Reorder Level",
  text: "",
};

//   async function getSEMails() {
//     const emails = await User.find({ type: "Site Engineer" }).select("email");
//     emails.forEach((e) => emails.push(e.email));
//   }

exports.sendReorderEmails = function sendReorderEmails(emails, item) {
  let mailsCount = emails.length;
  let i = 0;
  let failed = 0;
  let success = 0;
  let failedMails = [];
  emails.map((e) => {
    mailContent.to = e;
    mailContent.text = `
                      Item ${item.code} - ${item.name} Reached Reorder Level
  
              Reorder Level - ${item.reorderL} 
              Available Quantity - ${item.quantity} 
  
              Projects - ${item.projects.toString()}
              Suppliers - ${item.suppliers.toString()}
          `;

    transporter.sendMail(mailContent, function (error, data) {
      if (error) {
        failed++;
        i++;
        failedMails.push(e);
        if (i == mailsCount) {
          console.log(`Unable to send mail to ${e}`, error);
        }
      } else {
        success++;
        i++;
        if (i == mailsCount) {
          console.log(`Email send successfully to ${e}`);
        }
      }
    });
  });
};
