const { DailyReport } = require("../modules/dailyReportModule");
const { Item } = require("../modules/itemModule");
const { User } = require("../modules/userModule");
const ObjectId = require("mongoose").Types.ObjectId;

const { sendReorderEmails } = require("./utils/emails");

exports.createDUR = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Error (Create DUR) : ", error);
    res.status(500).send(error);
  }
};

exports.getAllDURs = async function (req, res) {
  try {
    const dus = await DailyReport.find({})
      .sort({ timeStamp: "desc" })
      .populate("createdBy", "-password")
      .populate("project")
      .populate({
        model: "Item",
        path: "items.id",
      });

    if (dus.length === 0) return res.status(404).send("No DURs Found");

    res.status(200).send(dus);
  } catch (error) {
    console.error("Error (Get All DURs) : ", error);
    res.status(500).send(error);
  }
};

exports.getOneDUR = async function (req, res) {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) return res.status(400).send("Invalid Id");

    const dus = await DailyReport.findById(id)
      .sort({ timeStamp: "desc" })
      .populate("createdBy", "-password")
      .populate("project")
      .populate({
        model: "Item",
        path: "items.id",
      });

    if (!dus) return res.status(404).send("DUR Not Found");

    res.status(200).send(dus);
  } catch (error) {
    console.error("Error (Get One DUR) : ", error);
    res.status(500).send(error);
  }
};
