import logger from "../../shared/logger.js";
import validMessage from "./application.js";

const sendMessage = async (ctx) => {
  try {
    if (ctx.session.statusUi !== "chat")
      return ctx.reply('Пожалуйста нажмите на кнопку "Решить задание"');

    const message = ctx.update.message.text;

    const result = await validMessage(message, ctx);
    ctx.reply(result.choices[0].message.content);
  } catch (error) {
    ctx.reply("Уважаемый пользователь, у нас что-то поломалось, обожди");
    logger.error("Ошибка в хэндлере chat:", error);
  }
};

export default sendMessage;
