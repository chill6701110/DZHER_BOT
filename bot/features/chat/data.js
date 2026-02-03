import logger from "../../shared/logger.js";
import axios from "axios";
import { config } from "../../app/config.js";
import { User } from "../../models/user.js";

const connectGpt = async (message, id) => {
  const options = {
    method: "POST",
    url: config.gptUrl,
    headers: {
      Authorization: `Bearer ${config.gptToken}`,
      "x-proxy-source": "",
      "Content-Type": "application/json",
    },
    data: {
      model: "gpt-4 nano",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    },
  };

  try {
    const { data } = await axios.request(options);
    const existingUser = await User.findOne({ tgId: id }); //CTX ПОДУМОТЬ ЧО ОН ТУТ ЗАБЫЛ???
    existingUser.tokenBalance =
      existingUser.tokenBalance - data.usage.total_tokens;
    existingUser.save();
    return data.choices[0].message.content;
  } catch (error) {
    logger.error(error);
  }
};

export default connectGpt;
