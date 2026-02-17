import logger from "../../shared/logger.js";
import { User } from "../../models/user.js";

const authUser = async (ctx, next) => {
  if (!ctx.from) {
    logger.warn("Не получена обязательная информация о пользователе");
    await next();
  }

  const { id } = ctx.from;

  try {
    let user = await User.findOne({ tgId: id });

    if (!user) {
      user = new User({
        tgId: id,
      });
    }

    if (new Date(user.date) < new Date()) {
      user.tokenBalance = 0;
    }
    user.save();
    ctx.user = user;

    await next();
  } catch (error) {
    logger.error(
      "Проблема в мидлваре запиши и проверки id в базе данных",
      error,
    );
    await next();
  }
};

export default authUser;
