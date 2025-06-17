import {
  createShortUrlWithoutUser,
  createShortUrlWithUser,
} from "../services/shortUrl.service.js";
import { getShortUrl } from "../dao/short_url.js";

export const createShortUrl = async (req, res, next) => {
  try {
    const { url } = req.body;
    console.log(url);
    const shortUrl = await createShortUrlWithoutUser(url);
    res.send(process.env.APP_URL + shortUrl);
  } catch (err) {
    next(err);
  }
};
export const redirectFromShortUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const url = await getShortUrl(id);
    res.redirect(url.full_url);
  } catch (err) {
    next(err);
  }
};
