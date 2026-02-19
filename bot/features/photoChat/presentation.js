import logger from "../../shared/logger.js";
import { getAnswerOnPhoto } from "./data.js";
import { config } from "../../app/config.js";

export const getPhotoUrl = async (ctx) => {
  try {
    const message = ctx.update.message.text;
    const id = ctx.from.id;
    const photo = ctx.message.photo.pop();
    const file = await ctx.api.getFile(photo.file_id);
    const photoUrl = `https://api.telegram.org/file/bot${config.botToken}/${file.file_path}`;
    logger.info(photoUrl);
    const result = await getAnswerOnPhoto(message, id, photoUrl);
    ctx.reply(result);
  } catch (error) {
    logger.error("Ошибка в getPhotoUrl");
    throw error;
  }
};
