import {Schema, model, models} from "mongoose";

const OrderSchema = new Schema({
    line_items: Object,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    city: String,
    zip: String,
    address: String,
    country: String,
    paid: Boolean,
}, {timestamps: true});

export const Order = models.Order || model("Order", OrderSchema)