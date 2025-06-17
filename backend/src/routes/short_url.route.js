import express from "express";
import { createShortUrl } from "../controller/shortUrl.controller.js";
const router=express.Router();

router.post("/api/create",createShortUrl);



export default router;