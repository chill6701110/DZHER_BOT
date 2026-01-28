import logger from "../../shared/logger.js";
import express from "express";
import promtMessage from "./application.js";
import chatSchema from "../../shared/schemas/chat.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    logger.info("Получен запрос:", req.body);

    const validateBody = chatSchema.parse(req.body);
    logger.info("Валидация всего письма проведена");

    const data = {
      tgid: validateBody.tgid,
      message: validateBody.message,
    };
    logger.info("Текст сообщения и id получен");

    const result = await promtMessage(data.message);

    res.status(200).json(result);
  } catch (error) {
    logger.info("Ошибка при валидации в фиче chat pres слое", error);
  }
});

router.get("/", (req, res) => {
  res.send("Привет из презентэйшн слоя фичи чат");
});

export default router;
