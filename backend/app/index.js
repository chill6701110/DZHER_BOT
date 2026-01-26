import  logger  from "../shared/logger.js";
import { config } from "./config.js";
import { serverStart } from "./server.js";

try {
  serverStart(config);
  logger.info("Сервер запущен");
} catch (error) {
  logger.error("Критическая ошибка при запуске приложения", error);
  process.exit(1);
}
