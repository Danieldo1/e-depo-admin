import mongoose, { Schema, model, models } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId, ref: "Category" },
  properties: { type: [Object] },
  image: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export const Category = models.Category || model("Category", CategorySchema);
