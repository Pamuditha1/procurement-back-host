let server = require("../../index");
const supertest = require("supertest");
const request = supertest(server);
const mongoose = require("mongoose");
const { MSR } = require("../../modules/msrModule");

const jwt = require("jsonwebtoken");

describe("auth middleware", () => {
  let token;

  beforeEach(() => {
    server = require("../../index");
    token = jwt.sign(
      { _id: "01", type: "Test", name: "Pamu" },
      process.env.JWT
    );
  });
  afterEach(async () => {
    server.close();
  });

  const exec = () => {
    return request.get("/api/view-msr/").set("auth-token", token);
  };

  it("should return 401 if no token is provided", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 400 if invalid token is provided", async () => {
    token = "3";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 200 if token is valid", async () => {
    const id = mongoose.Types.ObjectId();
    const msr = new MSR({
      timeStamp: new Date().toISOString(),
      msrNo: id,
      status: "Pending",
    });
    await msr.save();

    const res = await exec();
    expect(res.status).toBe(200);
  });
});
