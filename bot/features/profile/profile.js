import { InlineKeyboard } from "grammy";

const profileMenu = new InlineKeyboard().text("❮❮❮❮", "back");

export const showProfile = async (ctx) => {
  await ctx.callbackQuery.message.editText(
    ` Пользователь: ${ctx.from.username}\n\n💡 Ответов осталось: ${Math.round(
      ctx.user.tokenBalance / (ctx.user.spentTokens / ctx.user.countMessages),
    )}\n\n📅 Подписка до: ${new Date(ctx.user.date).toLocaleDateString("ru-RU").replace(/\//g, ".")}`,
    { reply_markup: profileMenu },
  );
  ctx.answerCallbackQuery();
};
