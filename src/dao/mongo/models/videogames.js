import mongoose from "mongoose";

const collection = "Videogames";

const schema = new mongoose.Schema ({
    title: {
        type:String,
        index: true
    },
    gender:String,
    price: Number,
    juegos: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Juegos"
        }
    ]
},{timestamps:true})

const videogameModel = mongoose.model(collection,schema);

export default videogameModel;