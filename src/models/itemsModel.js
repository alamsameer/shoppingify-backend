import mongoose from "mongoose";

const Schema=mongoose.Schema;

const itemSchema=new Schema({
    name:{  
        type:String,
        required:true,
        unique:true,
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category",
        required:true,
    },
    note:{
        type:String,
        required:true,
    },
    image:{
        type:String,
    },
});

const Item=mongoose.model("Item",itemSchema);

export default Item;