import { Bot } from "grammy";
import { config } from "./config.js";
import logger from "../shared/logger.js";
import sendMessage from "../features/chat/presentation.js";
import { Keyboard, InlineKeyboard } from "grammy";

let mode = { status: "menu" };

const bot = new Bot(config.botToken);

const menu = new InlineKeyboard()
  .text("Профиль", "button-1")
  .text("Тех. поддержка", "button-2")
  .text("Решить задание", "button-3");

bot.command("start", (ctx) =>
  ctx.reply("Привет, я - Дзхер Твой помощник в учебе"),
);

bot.command("menu", async (ctx) => {
  await ctx.reply("Меню", {
    reply_markup: menu,
  });
});

bot.callbackQuery("button-3", async (ctx) => {
  mode.status = "chat";
  await ctx.reply(
    "Напиши свое задание, но помни, я пока не умею обрабатывать фото",
  );
});

sendMessage(bot, mode);

bot.start();
logger.info("Бот стартанул");
