import { generateNanoid } from "../utils/helper.js";
import urlSchema from "../models/shortUrl.model.js";
import { getCustomShortUrl, saveShortUrl } from "../dao/short_url.js";

export const createShortUrlWithoutUser = async (url) => {
  const existingUrl = await urlSchema.findOne({ full_url: url });
  if (existingUrl) {
    return existingUrl.short_url; // Return existing short URL if it exists
  } else {
    const shortUrl = generateNanoid(7);
    if (!shortUrl) throw new Error("Short URL not generated");
    await saveShortUrl(shortUrl, url);
    return shortUrl;
  }
};


export const createShortUrlWithUser = async (url,userId,slug=null) => {
    const shortUrl = slug || generateNanoid(7)
    const exists = await getCustomShortUrl(slug)
    if(exists) throw new Error("This custom url already exists")

    await saveShortUrl(shortUrl,url,userId)
    return shortUrl
}
