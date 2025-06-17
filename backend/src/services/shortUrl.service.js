import { generateNanoid } from "../utils/helper.js";
import urlSchema from "../models/shortUrl.model.js";
import { saveShortUrl } from "../dao/short_url.js";

export const createShortUrlWithoutUser= async(url)=>{
    const shortUrl=  generateNanoid(7);
    if(!shortUrl) throw new Error("Short URL not generated")
    await saveShortUrl(shortUrl, url);
        return shortUrl;
}

export const createShortUrlWithUser= async(url,userId)=>{
    const shortUrl=  generateNanoid(7);
    await saveShortUrl(shortUrl, url,userId);
        return shortUrl;
}