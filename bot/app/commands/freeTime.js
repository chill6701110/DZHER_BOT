export const freeTimeCom = async (ctx) => {
  ctx.session.statusUi = "chat";
  await ctx.deleteMessage();
  await ctx.reply(
    "Напиши свое задание, но помни, я пока не умею обрабатывать фото",
  );
  ctx.answerCallbackQuery();
};
