import { v4 as uuid } from "uuid";
import createError from "http-errors";
import Celebrity from "../models/Celebrity";
import defaultMiddlewares from "../middlewares/defaultMiddlewares";

async function putCelebrity(event, context) {
  const { name, subtitle, height, photo, sender, source } = event.body;

  const celebrityParams = {
    id: event.body.id || uuid(),
    name,
    subtitle,
    height,
    photo,
    sender,
    source,
  };

  let celebrity;
  try {
    celebrity = await Celebrity.update(celebrityParams);
  } catch (error) {
    console.log("🔥: " + error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 201,
    body: JSON.stringify(celebrity),
  };
}

export const handler = defaultMiddlewares(putCelebrity);
