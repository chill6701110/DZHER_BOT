import { InlineKeyboard } from "grammy";

export const menu = new InlineKeyboard()
  .text("🆔 Профиль", "button-1")
  .text("💵 Оплатить", "button-2")
  .url("👩🏻‍💻 Тех. поддержка", "https://t.me/fOrsiysha")
  .row()
  .text("✍ Решить задание", "button-3");

export const freeTime = new InlineKeyboard().text(
  "🚀 Пробный период",
  "free-time",
);

export const payMenu = new InlineKeyboard()
  .text("🚀 Купить - 399 руб", "Pay")
  .row()
  .text("❮❮❮❮", "back");
