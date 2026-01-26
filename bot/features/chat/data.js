import logger from "../../shared/logger.js";
import axios from "axios";

const connectBack = async (data) => {
  try {
    const response = await axios.post("http://localhost:3000/chat", {
      message: data,
    });
    const result = response.data.message
    logger.info(result)
    return result;
  } catch (error) {
    console.error(error);
  }
};

export default connectBack;
