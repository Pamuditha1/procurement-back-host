let server = require("../../index");
const supertest = require("supertest");
const request = supertest(server);
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const { MSR } = require("../../modules/msrModule");
let token;

describe("/api/msr", () => {
  beforeEach(() => {
    server = require("../../index");

    token = jwt.sign(
      { _id: "01", type: "Test", name: "Pamu" },
      process.env.JWT
    );
  });
  afterEach(async () => {
    await MSR.deleteMany();
    server.close();
  });

  describe("GET /:id", () => {
    const id = mongoose.Types.ObjectId();

    it("should return 401 if user not logged in", async () => {
      const res = await request.get("/api/view-msr/" + id);

      expect(res.status).toBe(401);
    });

    it("should return 400 if invalid id", async () => {
      const res = await request.get("/api/view-msr/1").set("auth-token", token);

      expect(res.status).toBe(400);
    });

    it("should return 404 if MSR not found", async () => {
      const newId = mongoose.Types.ObjectId();
      const res = await request
        .get("/api/view-msr/" + newId)
        .set("auth-token", token);

      expect(res.status).toBe(404);
    });

    it("should return the msr if valid id", async () => {
      const msr = new MSR({
        timeStamp: new Date().toISOString(),
        msrNo: id,
        status: "Pending",
      });
      await msr.save();

      const res = await request
        .get("/api/view-msr/" + msr._id)
        .set("auth-token", token);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("status", "Pending");
    });
  });

  describe("GET /", () => {
    it("should return 401 if user not logged in", async () => {
      const res = await request.get("/api/view-msr/");

      expect(res.status).toBe(401);
    });
  });
});
