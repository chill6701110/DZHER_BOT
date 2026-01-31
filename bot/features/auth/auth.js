import logger from "../../shared/logger.js";
import { User } from "../../models/user.js";

const authUser = async (ctx, next) => {
  if (!ctx.from) {
    logger.warn("Не получена обязательная информация о пользователе");
    return next();
  }

  const { id } = ctx.from;

  try {
    const existingUser = await User.findOne({ tgId: id });

    if (!existingUser) {
      const newUser = new User({
        tgId: id,
      });
      newUser.save();
    }

    ctx.user = existingUser;

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
