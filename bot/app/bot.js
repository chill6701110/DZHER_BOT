import { Bot, GrammyError, HttpError, Keyboard, session } from "grammy";
import { config } from "./config.js";
import logger from "../shared/logger.js";
import sendMessage from "../features/chat/presentation.js";
import mongoose from "mongoose";
import authUser from "../features/auth/auth.js";
import { hydrate } from "@grammyjs/hydrate";
import {
  payment,
  telegramSuccessPaymentHandler,
} from "../features/pay/presentation.js";
import { showProfile } from "../features/profile/profile.js";
import { start } from "./commands/start.js";
import { menuCom } from "./commands/menu.js";
import { button3, button2 } from "./commands/butt.js";
import { backCom } from "./commands/back.js";
import { nextPayCom } from "./commands/nextPayAfterEndTokens.js";
import { freeTimeCom } from "./commands/freeTime.js";
import { setCom } from "./commands/setLeftMenu.js";
import { getPhotoUrl } from "../features/photoChat/presentation.js";

const bot = new Bot(config.botToken);

bot.on("pre_checkout_query", (ctx) => {
  ctx.answerPreCheckoutQuery(true);
});

bot.use(hydrate());

bot.on(":successful_payment", telegramSuccessPaymentHandler);

bot.use(
  session({
    initial: () => ({
      statusUi: "menu",
    }),
  }),
);

bot.use(authUser);

bot.api.setMyCommands(setCom);

bot.command("start", start);

bot.command("menu", menuCom);

bot.callbackQuery("button-3", button3);

bot.callbackQuery("button-2", button2);

bot.callbackQuery("Pay", payment);

bot.callbackQuery("button-1", showProfile);

bot.callbackQuery("back", backCom);

bot.callbackQuery("nextPay", nextPayCom);

bot.callbackQuery("free-time", freeTimeCom);

bot.on(":voice", async (ctx) => {
  ctx.session.statusUi = "menu";
  await ctx.reply("Извини, я пока не уменю слушать");
});

bot.on("message", getPhotoUrl);

// bot.on("message:text", sendMessage);

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
