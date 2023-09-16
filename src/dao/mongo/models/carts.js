import mongoose from "mongoose";

const collection = "Videogamestypes";

const schema = new mongoose.Schema({
    description: String,
    price: Number,
    carts: [
        {
        types: {
                type: mongoose.SchemaTypes.ObjectId,
                ref:"Carts"
                },
            added: Date,
            quantity: Number
        }
    ]
},{timestamps: true})

const typesModel = mongoose.model(collection, schema);

export default typesModel;