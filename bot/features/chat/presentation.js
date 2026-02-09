import logger from "../../shared/logger.js";
import validMessage from "./application.js";
import { InlineKeyboard } from "grammy";

const pay = new InlineKeyboard().text("Оплатить", "button-2");

const sendMessage = async (ctx) => {
  console.log(typeof ctx.user.date);
  try {
    if (ctx.user.tokenBalance <= 200)
      return ctx.reply("Уважаемый пользователь, пополни баланс", {
        reply_markup: pay,
      });
    if (ctx.session.statusUi !== "chat")
      return ctx.reply('Пожалуйста нажмите на кнопку "Решить задание"');

    const message = ctx.update.message.text;
    const id = ctx.from.id;

    const result = await validMessage(message, id);
    ctx.reply(result);
  } catch (error) {
    ctx.reply("Уважаемый пользователь, у нас что-то поломалось, обожди");
    logger.error("Ошибка в хэндлере chat:", error);
  }
};

export default sendMessage;
