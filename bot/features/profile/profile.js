import { InlineKeyboard } from "grammy";

const profileMenu = new InlineKeyboard().text("<", "back");

export const showProfile = async (ctx) => {
  await ctx.callbackQuery.message.editText(
    `У вас осталось ответов: ${Math.round(
      ctx.user.tokenBalance / (ctx.user.spentTokens / ctx.user.countMessages),
    )}`,
    { reply_markup: profileMenu },
  );
};
