import mongoose, { Schema } from "mongoose";

interface IURL {
  url: string,
  id: string,
  visitedCounter: number
}

const urlSchema: Schema<IURL> = new mongoose.Schema({
  url: {
    required: true,
    type: String,
  },
  id: {
    required: true,
    type: String
  },
  visitedCounter: {
    required: true,
    type: Number
  }
});

const URL = mongoose.model("urls", urlSchema);

export default URL;
export { IURL }