import mongoose from "mongoose";
import { IKnight } from "../../models/knight";
const { v4: uuidv4 } = require("uuid");

const KnightSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  name: String,
  nickname: String,
  birthday: String,
  weapons: [
    {
      name: String,
      mod: Number,
      attr: String,
      equipped: Boolean,
    },
  ],
  attributes: {
    strength: Number,
    dexterity: Number,
    constitution: Number,
    intelligence: Number,
    wisdom: Number,
    charisma: Number,
  },
  keyAttribute: String,
  deleted: Boolean,
  created_at: Date,
  updated_at: Date,
  deleted_at: Date,
});

const KnightModel = mongoose.model<IKnight>("Knights", KnightSchema);
export default KnightModel;
