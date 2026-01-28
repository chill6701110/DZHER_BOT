import axios from "axios";
import logger from "../../shared/logger.js";
import { config } from "../../app/config.js"; // нормально прокинуть

const sendAnswer = async (updatedPromtMessage) => {
  const options = {
    method: "POST",
    url: config.gptUrl,
    headers: {
      Authorization: `Bearer ${config.gptToken}`,
      "x-proxy-source": "",
      "Content-Type": "application/json",
    },
    data: {
      message: updatedPromtMessage,
      parent_message_id: "",
      file_ids: [""],
    },
  };
  try {
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default sendAnswer;
