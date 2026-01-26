import logger from "../../shared/logger.js";
import validMessage from "./application.js";

const sendMessage = async (bot) => {
  bot.on("message", async (ctx) => {
    const data = ctx.update.message.text;
    logger.info(`Получен текст ${data}`);
    const result = await validMessage(data);
    logger.info(result)
    ctx.reply(result);
  });
};
export default sendMessage;
