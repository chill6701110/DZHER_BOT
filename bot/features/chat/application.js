import logger from "../../shared/logger.js";
import connectGpt from "./data.js";

const validMessage = async (message, ctx) => {
  const updatedPromtMessage = `Ты — опытный педагог-репетитор с 15-летним стажем. Твоя задача — дать решение ученику максимально емко и понятно. Если вопрос не относится к учебной программе, то скажи, что ты можешь ему помочь только с учебой. Текст его задания: ${message}`;
  logger.info("Сформировано новое письмо в неиросеть");
  const result = await connectGpt(updatedPromtMessage, ctx);
  return result;
};

export default validMessage;
