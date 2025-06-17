import urlSchema from "../models/shortUrl.model.js";

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
    try{

        const newUrl = new urlSchema({
          full_url: longUrl,
          short_url: shortUrl,
        });
        if (userId) {
          newUrl.user = userId;
        }
        newUrl.save();
    }catch(err){
        throw new Error(err);
    }
};

export const getShortUrl = async (shortUrl) => {
  const url = await urlSchema.findOneAndUpdate({ short_url: shortUrl },{$inc:{click:1}});
  return url;
};
