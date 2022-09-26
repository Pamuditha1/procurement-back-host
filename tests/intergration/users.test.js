let server = require("../../index");
const supertest = require("supertest");
const request = supertest(server);
const jwt = require("jsonwebtoken");

const { User } = require("../../modules/userModule");

let token;

describe("/api/users", () => {
  beforeEach(() => {
    server = require("../../index");

    token = jwt.sign(
      { _id: "01", type: "Test", name: "Pamu" },
      process.env.JWT
    );
  });
  afterEach(async () => {
    await User.deleteMany();
    server.close();
  });
  describe("GET /", () => {
    it("should return all users", async () => {
      await User.collection.insertMany([
        {
          username: "Pamuditha",
          email: "Email",
          contactNo: "0112704105",
        },
      ]);
      const res = await request.get("/api/get-users").set("auth-token", token);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body.some((u) => u.username === "Pamuditha"));
      expect(res.body.some((u) => u.email === "Email"));
      expect(res.body.some((u) => u.contactNo === "0112704105"));
    });
  });
});
