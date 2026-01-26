import dotenv from "dotenv";
import logger from "../shared/logger.js";

dotenv.config();

function getRequiredEnv(name) {
  const value = process.env[name];
  if (value === undefined || value === "") {
    logger.error(
      `У вас не указана обязательная переменная ${name} в файле .env`,
    );
    throw new Error(`Пожалуйста укажите ${name}`);
  }
  return value;
}

function getOptinalEnv(name, defaultValue) {
  const value = process.env[name];
  if (value === undefined || value === "") {
    logger.warn(
      `У вас не указана опциональная переменная ${name} в файле .env. Будет использовано значение по умолчанию`,
    );
    return defaultValue;
  }
  return value;
}

const config = {
  botToken: getRequiredEnv("BOT_TOKEN"),
};

export { getRequiredEnv, getOptinalEnv, config };
