import express from "express";
import {nanoid} from "nanoid";
import dotenv from "dotenv";
import connectDB from "./src/config/mongo.config.js";
import urlSchema from "./src/models/shortUrl.model.js";
import shortUrl from "./src/routes/short_url.route.js";
import { redirectFromShortUrl } from "./src/controller/shortUrl.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
dotenv.config("./.env");

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const id=nanoid(5);
app.use(shortUrl);
app.get("/:id",redirectFromShortUrl);

app.use(errorHandler);

app.listen(3000,()=>{
    connectDB();
    console.log('Server is running on port http://localhost:3000');
})

