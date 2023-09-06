import mongoose from "mongoose";

const collection = "Videogamestypes";

const schema = new mongoose.Schema({
    title: String,
    gender: String,
    price: Number,
    juegos: [
        {
            types: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "types"
            },
            quantity: Number
        }
    ]
}, {timestamps:true})

const typesModel = mongoose.model(collection,schema);

export default typesModel;