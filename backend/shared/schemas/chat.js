import { z } from "zod";
import { id } from "zod/v4/locales";

const chatSchema = z.object({
  tgid: z
    .number()
    .int("ID должен быть целым числом")
    .positive("ID должен быть положительным числом")
    .refine((val) => val.toString().length >= 5, {
      message: "ID должен содержать минимум 5 цифр",
    })
    .refine((val) => val.toString().length <= 12, {
      message: "ID должен содержать максимум 12 цифр",
    })
    .describe("Уникальный id пользователя"),

  message: z
    .string()
    .min(1, "Сообщение не может быть пустым")
    .max(1000, "Сообщение слишком длинное (максимум 1000 символов)")
    .trim()
    .describe("Текст сообщения от пользователя"),
});

export default chatSchema;
