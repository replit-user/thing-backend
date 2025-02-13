import dotenv from "dotenv";
dotenv.config();
import express from "express";
import router from "./routes.js";
import { sendTextToPhone } from "./twilio.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use("/", router);
app.use(express.json());
app.listen(10000, () => {
  console.log("your up and running dude!");
});
app.get("/", (req, res) => {
  res.json("all systems go");
});
try {
  app.post("/send", async (req, res) => {
    const PhoneNumber = req.body.phoneNumber;
    const Message = req.body.message;
    await sendTextToPhone(PhoneNumber, Message);
    console.log({ PhoneNumber, Message });
    res.json("data Recived");
  });
} catch (error) {
  res.json("there was an error sending the text :(");
}
console.log("message sent");
