import express from "express";
import logger from "../shared/logger.js";
import router from "../features/chat/presentation.js";

const chatRouter = router;

const serverStart = (config) => {
  const app = express();

  app.use(express.json());
  app.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
    res.status(500).json({ error: err });
  });
  app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK" });
    logger.info("Привет с /health");
  });

  app.use("/chat", chatRouter);

  app.listen(config.port, () => {
    logger.info(`Сервер запущен на http://localhost:${config.port}`);
  });
};

export { serverStart };
