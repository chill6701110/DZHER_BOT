import logger from "../../shared/logger.js";
import axios from "axios";
import { config } from "../../app/config.js";

const connectGpt = async (message) => {
  const options = {
    method: "POST",
    url: config.gptUrl,
    headers: {
      Authorization: `Bearer ${config.gptToken}`,
      "x-proxy-source": "",
      "Content-Type": "application/json",
    },
    data: {
      message: message,
      parent_message_id: "",
      file_ids: [""],
      
    },
  };
  try {
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    logger.error(error);
  }
};

export default connectGpt;
