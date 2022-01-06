const { MSR } = require("../modules/msrModule");
const { PR } = require("../modules/prModule");
const { PO } = require("../modules/poModule");
const { GRN } = require("../modules/grnModule");
const { DailyReport } = require("../modules/dailyReportModule");

exports.generateMSRno = async function (req, res) {
  try {
    const msr = await MSR.find({}).sort({ timeStamp: "desc" }).limit(1);

    let newNo = 0;
    if (msr.length > 0) {
      newNo = parseInt(msr[0].msrNo) + 1;
      res.status(200).send(newNo.toString());
    } else {
      res.status(200).send(newNo.toString());
    }
  } catch (error) {
    console.error("Error (Get MSR no) : ", error);
    res.status(500).send(error);
  }
};

exports.generatePRno = async function (req, res) {
  try {
    const pr = await PR.find({}).sort({ timeStamp: "desc" }).limit(1);

    let newNo = 0;
    if (pr.length > 0) {
      newNo = parseInt(pr[0].prNo) + 1;
      res.status(200).send(newNo.toString());
    } else {
      res.status(200).send(newNo.toString());
    }
  } catch (error) {
    console.error("Error (Get PR no) : ", error);
    res.status(500).send(error);
  }
};

exports.generatePOno = async function (req, res) {
  try {
    const po = await PO.find({}).sort({ timeStamp: "desc" }).limit(1);

    let newNo = 0;
    if (po.length > 0) {
      newNo = parseInt(po[0].poNo) + 1;
      res.status(200).send(newNo.toString());
    } else {
      res.status(200).send(newNo.toString());
    }
  } catch (error) {
    console.error("Error (Get PO no) : ", error);
    res.status(500).send(error);
  }
};

exports.generateGRNno = async function (req, res) {
  try {
    const grn = await GRN.find({}).sort({ timeStamp: "desc" }).limit(1);

    let newNo = 0;
    if (grn.length > 0) {
      newNo = parseInt(grn[0].grnNo) + 1;
      res.status(200).send(newNo.toString());
    } else {
      res.status(200).send(newNo.toString());
    }
  } catch (error) {
    console.error("Error (Get GRN no) : ", error);
    res.status(500).send(error);
  }
};

exports.generateDURno = async function (req, res) {
  try {
    const report = await DailyReport.find({})
      .sort({ timeStamp: "desc" })
      .limit(1);

    let newNo = 0;
    if (report.length > 0) {
      newNo = parseInt(report[0].reportNo) + 1;
      res.status(200).send(newNo.toString());
    } else {
      res.status(200).send(newNo.toString());
    }
  } catch (error) {
    console.error("Error (Get DUR no) : ", error);
    res.status(500).send(error);
  }
};
