import { menu } from "../../app/keyboards.js";

export const menuCom = async (ctx) => {
  ctx.session.statusUi = "menu";
  await ctx.deleteMessage();
  ctx.reply(
    `<b>Меню

Мгновенные ответы на школьные вопросы

Поддержка 24/7 в любое время дня и ночи

Любые предметы школьной и ВУЗовской программы</b>`,
    {
      reply_markup: menu,
      parse_mode: "HTML",
    },
  );
};
