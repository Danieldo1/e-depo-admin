import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
    title: {type: String, required: true},
    description: String,
    price: {
        type: Number,
        required: true
    }
})

export const Product = model('New Products', ProductSchema) || models.Product