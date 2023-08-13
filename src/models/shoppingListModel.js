import mongoose from "mongoose";

const Schema = mongoose.Schema;

const shoppingListSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,   
    },
    current: {
        type: Boolean,
        required: true,
    },
    items: [
        {
            item: {
                type: Schema.Types.ObjectId,
                ref: "Item",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            purchaseHistory: [
                {
                    date: {
                        type: Date,
                        required: true,
                    },
                    count: {
                        type: Number,
                        required: true,
                    },
                },
            ],
        },
    ],
});

const ShoppingList = mongoose.model("ShoppingList", shoppingListSchema);

export default ShoppingList;
  