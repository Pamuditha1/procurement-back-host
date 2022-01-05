const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

var path = require("path");
global.appRoot = path.resolve(__dirname);

const auth = require("./routes/auth");
const items = require("./routes/items");
const projects = require("./routes/projects");
const users = require("./routes/users");
const msrs = require("./routes/msrs");
const prs = require("./routes/prs");
const pos = require("./routes/pos");
const grns = require("./routes/grns");
const durs = require("./routes/durs");
const suppliers = require("./routes/suppliers");
const nos = require("./routes/nos");
const ses = require("./routes/ses");

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => {
    console.log("Could not Connect to mongoDB", err);
  });

app.use(cors());
app.use(express.json());

app.use("/api/login", auth);
app.use("/api/add-item", items);
app.use("/api/get-items", items);
app.use("/api/edit-item", items);
app.use("/api/add-project", projects);
app.use("/api/get-projects", projects);
app.use("/api/register/user", users);
app.use("/api/get-users", users);
app.use("/api/update-user", users);
app.use("/api/create-msr", msrs);
app.use("/api/update-msr", msrs);
app.use("/api/view-msr", msrs);
app.use("/api/create-pr", prs);
app.use("/api/view-pr", prs);
app.use("/api/create-po", pos);
app.use("/api/view-po", pos);
app.use("/api/update-po", pos);
app.use("/api/create-grn", grns);
app.use("/api/view-grn", grns);
app.use("/api/create-usage", durs);
app.use("/api/view-du", durs);
app.use("/api/suppliers", suppliers);
app.use("/api/get-no", nos);
app.use("/api/site-engineers", ses);

const defaultPort = process.env.NODE_ENV == "test" ? 3005 : 3003;
const port = process.env.PORT || defaultPort;

const server = app.listen(port, () =>
  console.log(`Listening on port ${port} ...`)
);

module.exports = server;
