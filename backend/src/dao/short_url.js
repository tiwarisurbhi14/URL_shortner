import urlSchema from "../models/shortUrl.model.js";
import { ConflictError } from "../utils/errorHandler.js";

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
    try{
        const newUrl = new urlSchema({
            full_url:longUrl,
            short_url:shortUrl
        })
        if(userId){
            newUrl.user = userId
        }
        await newUrl.save()
    }catch(err){
        if(err.code == 11000){
            throw new ConflictError("Short URL already exists")
        }
        throw new Error(err)
    }
};

export const getShortUrl = async (shortUrl) => {
  const url = await urlSchema.findOneAndUpdate({ short_url: shortUrl },{$inc:{click:1}});
  return url;
};

export const getCustomShortUrl = async (slug) => {
    return await urlSchema.findOne({ short_url: slug });
}
