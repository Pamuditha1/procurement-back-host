const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const nodemailMailGun = require("nodemailer-mailgun-transport");

const { DailyReport } = require("../modules/dailyReportModule");
const { Item } = require("../modules/itemModule");
const { User } = require("../modules/userModule");

router.post("/", async (req, res) => {
  let dur = await DailyReport.findOne({
    reportNo: req.body.reportData.reportNo,
  });
  if (dur)
    return res
      .status(400)
      .send(`DUR ${req.body.reportData.reportNo} Already Created`);

  let newdailyReport = new DailyReport({
    timeStamp: new Date().toISOString(),
    reportNo: req.body.reportData.reportNo,
    items: req.body.reportItems,
    project: req.body.reportData.project,
    createdBy: req.body.userID,
    status: "Created",
  });
  await newdailyReport.save();

  //decrease inventory
  req.body.reportItems.forEach((i) => {
    Item.findById(i.id)
      .then((item) => {
        item.quantity = parseInt(item.quantity) - parseInt(i.quantity);
        item.save();

        return item;
      })
      .then((item) => {
        if (parseInt(item.quantity) <= parseInt(item.reorderL)) {
          User.find({ type: "Site Engineer" })
            .select("email")
            .then((u) => {
              let emails = [];
              u.forEach((e) => emails.push(e.email));
              sendReorderEmails(emails, item);
            });
        }
      });
  });

  res.status(200).send("Daily Report Successfully Created");
  return;
});
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

async function getSEMails() {
  const emails = await User.find({ type: "Site Engineer" }).select("email");
  emails.forEach((e) => emails.push(e.email));
}
function sendReorderEmails(emails, item) {
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
}

module.exports = router;
