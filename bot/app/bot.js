import { Bot, GrammyError, HttpError, Keyboard, session } from "grammy";
import { config } from "./config.js";
import logger from "../shared/logger.js";
import sendMessage from "../features/chat/presentation.js";
import { InlineKeyboard } from "grammy";
import mongoose from "mongoose";
import authUser from "../features/auth/auth.js";
import { hydrate } from "@grammyjs/hydrate";

const bot = new Bot(config.botToken);
bot.use(hydrate());
bot.use(
  session({
    initial: () => ({
      statusUi: "menu",
    }),
  }),
);

bot.use(authUser);

const menu = new InlineKeyboard()
  .text("Профиль", "button-1")
  .text("Оплатить", "button-2")
  .text("Тех. поддержка", "button-4")
  .row()
  .text("Решить задание", "button-3");

const freeTime = new InlineKeyboard().text(
  "Начать пробный период",
  "free-time",
);

const payMenu = new InlineKeyboard()
  .text("Купить - 399 руб", "Pay")
  .row()
  .text("<", "back");

bot.api.setMyCommands([
  {
    command: "start",
    description: "Запуск бота",
  },
  {
    command: "menu",
    description: "Главное меню",
  },
]);

bot.command("start", async (ctx) => {
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
});

bot.command("menu", async (ctx) => {
  ctx.session.statusUi = "menu";
  await ctx.reply("Меню", {
    reply_markup: menu,
  });
});

bot.callbackQuery("button-3", async (ctx) => {
  ctx.session.statusUi = "chat";
  await ctx.reply(
    "Напиши свое задание, но помни, я пока не умею обрабатывать фото",
  );
});

bot.callbackQuery("button-2", async (ctx) => {
  await ctx.callbackQuery.message.editText(
    "В 25 раз больше запросов 250 - 300 завпросов",
    {
      reply_markup: payMenu,
    },
  );
});

bot.callbackQuery("back", async (ctx) => {
  await ctx.callbackQuery.message.editText("Mеню", {
    reply_markup: menu,
  });
});

bot.callbackQuery("free-time", async (ctx) => {
  ctx.session.statusUi = "chat";
  await ctx.reply(
    "Напиши свое задание, но помни, я пока не умею обрабатывать фото",
  );
});

bot.on(":voice", async (ctx) => {
  ctx.session.statusUi = "menu";
  await ctx.reply("Извини, я пока не уменю слушать");
});

bot.on(":photo", async (ctx) => {
  ctx.session.statusUi = "menu";
  await ctx.reply("Извини, я пока не распознаю картинки");
});

bot.on("message:text", sendMessage);

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Ошибка при обработке апдейта ${ctx.update.update_id}:`);

  const e = err.error;

  if (e instanceof GrammyError) {
    console.error("Ошибка запроса к Telegram:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Не удалось связаться с Telegram:", e);
  } else {
    console.error("Неизвестная ошибка:", e);
  }
});

const startBot = async () => {
  try {
    await mongoose.connect(config.dbToken);
    bot.start();
    logger.info("Бот стартанул. База подключилась");
  } catch (error) {
    logger.error("Ошибка в функции startBot", error);
  }
};

startBot();
