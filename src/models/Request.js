import dynamoose from "dynamoose";
import { v4 as uuid } from "uuid";
const requestSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      default: uuid(),
    },
    name: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      default: true,
      required: true,
    },
    source: {
      type: String,
      default: true,
    },
    photo: {
      type: String,
      default: true,
    },
    sender: {
      type: String,
      default: true,
    },
    details: {
      type: String,
      default: true,
    },
    celebrityId: {
      type: String,
      default: true,
    },
  },
  {
    saveUnknown: false,
    timestamps: true,
  }
);
export default dynamoose.model("Request", requestSchema);
