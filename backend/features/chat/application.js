import logger from "../../shared/logger.js";
import sendAnswer from "./data.js";

const promtMessage = async (message) => {
  const updatedPromtMessage = `Ты — опытный педагог-репетитор с 15-летним стажем. Твоя задача — дать решение ученику максимально емко и понятно. Текст его задания ${message}`;
  logger.info("Сформировано новое письмо в неиросеть");
  const data = await sendAnswer(updatedPromtMessage);
  return data;
};

export default promtMessage;
