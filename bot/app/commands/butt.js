import { payMenu } from "../keyboards.js";

export const button3 = async (ctx) => {
  ctx.session.statusUi = "chat";
  await ctx.deleteMessage();
  await ctx.reply(
    "Напиши свое задание, но помни, я пока не умею обрабатывать фото",
  );
  ctx.answerCallbackQuery();
};

export const button2 = async (ctx) => {
  await ctx.callbackQuery.message.editText(
    "В 25 раз больше запросов 250 - 300 завпросов",
    {
      reply_markup: payMenu,
    },
  );
  ctx.answerCallbackQuery();
};
