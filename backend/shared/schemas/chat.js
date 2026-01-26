import { z } from "zod";

const SendMessageSchema = z.object({
  message: z
    .string()
    .min(1, "Сообщение не может быть пустым")
    .max(1000, "Сообщение слишком длинное (максимум 1000 символов)")
    .trim()
    .describe("Текст сообщения от пользователя"),
});

export default SendMessageSchema;
