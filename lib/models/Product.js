import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    properties: {
      type: Object,
    },
    features: {
      type: [String],
    },
    color: {
      type: String,
    },
    weight: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Product = models.Product || model("Product", ProductSchema);
