import express from "express";
const router = express.Router();
router.get("/", (request, responce) => {
  responce.json("all systems go");
});
router.post("/cool", (request, responce) => {
  console.log(request.body);
  responce
    .status(201)
    .json("we got your message, we will respond within 5 buisness days");
});
export default router;
