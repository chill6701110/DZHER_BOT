import logger from "../../shared/logger.js";
import axios from "axios";
import { config } from "../../app/config.js";
import { User } from "../../models/user.js";

export const getAnswerOnPhoto = async (message, id, url) => {
  const options = {
    method: "POST",
    url: config.gptUrl,
    headers: {
      Authorization: `Bearer ${config.gptToken}`,
      "x-proxy-source": "",
      "Content-Type": "application/json",
    },
    data: {
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: message },
            { type: "image_url", image_url: { url: url } },
          ],
        },
      ],
    },
  };

  try {
    const { data } = await axios.request(options);
    const existingUser = await User.findOne({ tgId: id });
    existingUser.tokenBalance =
      existingUser.tokenBalance - data.usage.total_tokens;
    existingUser.countMessages += 1;
    existingUser.spentTokens += data.usage.total_tokens;
    existingUser.save();
    logger.info(data);
    return data.choices[0].message.content;
  } catch (error) {
    logger.error("Ошибка в дата слое photoChat");
    throw error;
  }
};
