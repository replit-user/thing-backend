import dotenv from "dotenv";
dotenv.config();
import express from "express";
import router from "./routes.js";
import { sendTextToPhone } from "./twilio.js";
import cors from "cors";
import twilio from "twilio";
let replyMessage;
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
    res.json("data Recived");
  });
} catch (error) {
  res.json("there was an error sending the text :(");
}
console.log("message sent");
app.post("/sms", (req, res) => {
  const { MessagingResponse } = twilio.twiml;
  const twiml = new MessagingResponse();

  console.log({ returnText: req.body.Body });

  replyMessage = req.body.Body;
  res.type("text/sml").send(twiml.toString());
});
app.get("/replyMessages", (req, res) => {
  res.json(replyMessage);
});
