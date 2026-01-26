import logger from "../../shared/logger.js";
import express from "express";
import promtMessage from "./application.js";
import SendMessageSchema from "../../shared/schemas/chat.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    logger.info("Получен запрос:", {
      body: req.body,
    });

    const validateBody = SendMessageSchema.parse(req.body);
    logger.info("Валидация всего письма проведена");

    const data = validateBody.message;
    logger.info("Текст сообщения получен");

    const result = await promtMessage(data);
    logger.info(result);

    res.status(200).json(result);
  } catch (error) {
    logger.info("Ошибка при валидации в фиче chat pres слое", error);
  }
});

router.get("/", (req, res) => {
  res.send("Привет из презентэйшн слоя фичи чат");
});

export default router;
