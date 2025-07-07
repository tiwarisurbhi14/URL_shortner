import express from "express";
import { createShortUrl,updateShortUrl } from "../controller/shortUrl.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/", createShortUrl);
router.patch("/update",updateShortUrl);
export default router;
