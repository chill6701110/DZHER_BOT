import logger from "../../shared/logger.js";
import connectBack from "./data.js";

const validMessage = async (data) => {
  const result = await connectBack(data);
  logger.info("Валидация сообщения выполнена");
  return result;
};
export default validMessage;
