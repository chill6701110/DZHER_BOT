import { freeTime } from "./keyboards.js";

export const start = async (ctx) => {
  ctx.session.statusUi = "menu";
  if (ctx.user.role === "user") {
    ctx.reply("Привет, я - Списун. Твой помощник в учебе.", {
      reply_markup: freeTime,
    });
  }
  if (ctx.user.role === "userVip") {
    ctx.reply(
      `Рад тебя снова видеть, ${ctx.from?.first_name}. Продолжим? /menu`,
    );
  }
};
