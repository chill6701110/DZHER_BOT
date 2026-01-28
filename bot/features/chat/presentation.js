import logger from "../../shared/logger.js";
import validMessage from "./application.js";

const sendMessage = async (bot, mode) => {
  bot.on("message:text", async (ctx) => {
    try {
      if (mode.status !== "chat")
        return ctx.reply('Пожалуйста нажмите на кнопку "Решить задание"');
      const data = {
        tgid: ctx.message.from.id,
        message: ctx.update.message.text,
      };
      const result = await validMessage(data);
      ctx.reply(result);
    } catch (error) {
      ctx.reply("Уважаемый пользователь, у нас что-то поломалось, обожди");
      logger.error("Ошибка в хэндлере chat:", error);
    }
  });
};

export default sendMessage;
