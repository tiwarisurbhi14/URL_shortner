import { generateNanoid } from "../utils/helper.js";
import {
  createShortUrlWithoutUser,
  createShortUrlWithUser,
} from "../services/shortUrl.service.js";
import { getShortUrl } from "../dao/short_url.js";
import wrapAsync from "../utils/tryCatchWraper.js";
import  urlSchema  from "../models/shortUrl.model.js";

export const createShortUrl = wrapAsync(async (req, res) => {
  const { url, slug } = req.body;
  let result;

  if (req.user) {
    result = await createShortUrlWithUser(url, req.user._id, slug);
  } else {
    result = await createShortUrlWithoutUser(url);
  }
  res.status(200).json({
    shortUrl: process.env.APP_URL + result.shortUrl,
    alreadyExists: result.alreadyExists,
  });
});

export const redirectFromShortUrl = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const url = await getShortUrl(id);
  if (!url) throw new Error("Short URL not found");
  res.redirect(url.full_url);
});

export const createCustomShortUrl = wrapAsync(async (req, res) => {
  const { url,customUrl } = req.body;
  const shortUrl = await createShortUrlWithUser(url, customUrl);
  res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
});


export const updateShortUrl = wrapAsync(async (req, res) => {
  const { url, slug } = req.body;
  const userId = req.user?._id; 

  const existing = await urlSchema.findOne({ full_url: url, user: userId });

  if (!existing) {
    return res.status(404).json({ message: "URL not found" });
  }

  let newSlug = slug && slug.trim() ? slug.trim() : generateNanoid(7);

  const existsSlug = await urlSchema.findOne({ short_url: newSlug });
  if (existsSlug) {
    return res.status(409).json({ message: "This short URL already exists" });
  }

  existing.short_url = newSlug;
  await existing.save();

  res.status(200).json({ message: "Updated successfully", shortUrl: process.env.APP_URL + newSlug });
});
