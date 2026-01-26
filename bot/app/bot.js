import { Bot } from "grammy";
import { config } from "./config.js";
import logger from "../shared/logger.js";
import sendMessage from "../features/chat/presentation.js";

const bot = new Bot(config.botToken);
bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
sendMessage(bot);
bot.start();
logger.info("Бот стартанул");
