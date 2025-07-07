import { generateNanoid } from "../utils/helper.js";
import urlSchema from "../models/shortUrl.model.js";
import { getCustomShortUrl, saveShortUrl } from "../dao/short_url.js";

export const createShortUrlWithoutUser = async (url) => {
  const existingUrl = await urlSchema.findOne({ full_url: url, user: { $exists: false } });

  if (existingUrl) {
    return {
      shortUrl: existingUrl.short_url,
      alreadyExists: true
    };
  }
  let shortUrl;
  while (true) {
    shortUrl = generateNanoid(7);
    const exists = await urlSchema.findOne({ short_url: shortUrl });
    if (!exists) break;
  }
  await saveShortUrl(shortUrl, url);

  return {
    shortUrl,
    alreadyExists: false
  };
};



export const createShortUrlWithUser = async (url, userId, slug = null) => {
  const existingUrl = await urlSchema.findOne({
    full_url: url,
    user: userId,
  });

   if (existingUrl) {
    return {
      shortUrl: existingUrl.short_url,
      alreadyExists: true,
    };
  }

  let shortUrl;

  if (slug) {
    const exists = await getCustomShortUrl(slug);
    if (exists) throw new Error("This custom URL already exists");
    shortUrl = slug;
  } else {
    while (true) {
      shortUrl = generateNanoid(7);
      const exists = await getCustomShortUrl(shortUrl);
      if (!exists) break;
    }
  }

  await saveShortUrl(shortUrl, url, userId);
  return {shortUrl, alreadyExists: false};
};
