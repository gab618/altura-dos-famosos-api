import createError from "http-errors";
import Celebrity from "../models/Celebrity";
import defaultMiddlewares from "../middlewares/defaultMiddlewares";

async function getCelebrities(event, context) {
  const { id } = event.queryStringParameters;

  const startAt = id ? { id } : null;

  let celebritiesList;
  try {
    celebritiesList = await Celebrity.scan().startAt(startAt).limit(2).exec();
  } catch (error) {
    console.log("🔥: " + error);
    throw new createError.InternalServerError(error);
  }

  const celebrities = celebritiesList.toJSON();
  const { lastKey } = celebritiesList;

  const response = { celebrities };
  if (lastKey) response.next = lastKey.id;

  return {
    statusCode: 201,
    body: JSON.stringify(response),
  };
}

export const handler = defaultMiddlewares(getCelebrities);
