import logger from "../../shared/logger.js";
import axios from "axios";

const connectBack = async (data) => {
  try {
    const response = await axios.post("http://localhost:3000/chat", data, {
      timeout: 10000,
    });
    const result = response.data.message;
    if (result === undefined || result === null || !result)
      throw new Error("Ошибка в ответе с backend");
    return result;
  } catch (error) {
    logger.error("Ошибка во взаимодействии с backend", error.message);
    throw error;
  }
};

export default connectBack;
