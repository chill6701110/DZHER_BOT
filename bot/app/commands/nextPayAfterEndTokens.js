import { payMenu } from "./keyboards.js";

export const nextPayCom = async (ctx) => {
  await ctx.callbackQuery.message.editText("Тарифы", {
    reply_markup: payMenu,
  });
};
