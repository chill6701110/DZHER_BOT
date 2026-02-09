import logger from "../../shared/logger.js";
import { User } from "../../models/user.js";
import { InlineKeyboard } from "grammy";

const afterPay = new InlineKeyboard().text("<", "back");
const support = new InlineKeyboard().url(
  "Написать админу",
  "https://t.me/fOrsiysha",
);

export const payment = async (ctx) => {
  ctx.session.statusUi = "menu";
  await ctx.deleteMessage();
  const product = {
    name: "Пакет_1",
    discription: "Чат с учебным ботом",
    id: 1,
    price: 399,
  };
  try {
    const chatId = ctx.chat?.id;
    if (!chatId) {
      throw new Error("Не определен id чата");
    }

    const providerInvoiceData = {
      receipt: {
        items: [
          {
            description: product.discription,
            quantity: 1,
            amount: {
              value: `${product.price}.00`,
              currency: "RUB",
            },
            vat_code: 1,
          },
        ],
      },
    };

    ctx.api.sendInvoice(
      chatId,
      product.name,
      product.discription,
      product.id.toString(),
      "RUB",
      [
        {
          label: "Руб",
          amount: product.price * 100,
        },
      ],
      {
        provider_token: process.env.PAYMENT_TOKEN,
        need_email: true,
        send_email_to_provider: true,
        provider_data: JSON.stringify(providerInvoiceData),
      },
    );

    ctx.answerCallbackQuery();
  } catch (error) {
    logger.error(`Ошибка при оплате у ${ctx.from.id}`);
    ctx.reply("Сервис оплаты не работает, напишите админу", {
      reply_markup: support,
    });
    throw new Error("Ошибка в фиче оплаты");
  }
};

export const telegramSuccessPaymentHandler = async (ctx) => {
  logger.info(ctx.message?.successful_payment);
  try {
    const existingUser = await User.findOne({ tgId: ctx.from.id });
    existingUser.tokenBalance = existingUser.tokenBalance + 250000;
    existingUser.date = new Date();
    existingUser.date.setDate(existingUser.date.getDate() + 30);
    existingUser.save();
    ctx.reply("Оплата прошла успешно, Списун готов решать задачи", {
      reply_markup: afterPay,
    });
  } catch (error) {
    logger.error(`Ошибка при добавилении в БД оплаты у ${ctx.from.id}`, error);
    ctx.reply("Сервис оплаты не работает, напишите админу", {
      reply_markup: support,
    });
  }
};
