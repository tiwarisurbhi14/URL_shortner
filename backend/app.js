import express from "express";
import {nanoid} from "nanoid";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/mongo.config.js";
import shortUrl from "./src/routes/short_url.route.js";
import user_routes from "./src/routes/user.routes.js";
import auth_routes from "./src/routes/auth.routes.js";
import { redirectFromShortUrl } from "./src/controller/shortUrl.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser";
dotenv.config("./.env");

const app=express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
}));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(attachUser);
app.use("/api/user",user_routes);
app.use("/api/auth",auth_routes);
app.use("/api/create",shortUrl);
app.get("/:id",redirectFromShortUrl);

app.use(errorHandler);

app.listen(3000,()=>{
    connectDB();
    console.log('Server is running on port http://localhost:3000');
})

