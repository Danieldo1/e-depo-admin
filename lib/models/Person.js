import {models, Schema, model} from "mongoose";

const PersonSchema = new Schema({
    name: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    },
    whishList: {
        type: [Schema.Types.ObjectId],
        ref: "Product",
        default: []
    },
    orders: {
        type: [Schema.Types.ObjectId],
        ref: "Order",
        default: []
    }
});

export const Person = models.Person || model("Person", PersonSchema)