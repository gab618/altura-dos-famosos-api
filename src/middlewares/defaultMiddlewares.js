/**
 * @external  CommonMiddleware
 * @description Common Middleware for all requests and apply filters
 */
import middy from "@middy/core";
import validator from "@middy/validator";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import httpEventNormalizer from "@middy/http-event-normalizer";
import httpErrorHandler from "middy-middleware-json-error-handler";
import cors from "@middy/http-cors";
export default (handler, inputSchema = {}) => {
  return middy(handler).use([
    httpJsonBodyParser(),
    httpEventNormalizer(),
    httpErrorHandler(),
    cors({
      methods: "*",
      headers:
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    }),
    validator({
      inputSchema,
      ajvOptions: {
        strict: true,
      },
    }),
  ]);
};
