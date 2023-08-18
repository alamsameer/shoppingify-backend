import mongoose from "mongoose";

const Schema = mongoose.Schema;

const shoppingListSchema = new Schema({
    name: {
        type: String,
        default:"Shopping List",
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'completed'],
        default: 'active',
    },
    items: [
        {
            item: {
                type: Schema.Types.ObjectId,
                ref: "Item",
            },
            status: {
                type: Boolean,
                default: false,
            },
            purchaseHistory: [
                {
                    date: {
                        type: Date,
                    },
                    count: {
                        type: Number,
                    },
                },
            ],
        },
    ],
});

const ShoppingList = mongoose.model("ShoppingList", shoppingListSchema);

export default ShoppingList;
  