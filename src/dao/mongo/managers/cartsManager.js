import typesModel from "../models/carts.js";

export default class cartsManager {
    
    getcarts = (params) => {
        return typesModel.find(params).lean();
    }

    getcartsById = (params) => {
        return typesModel.findOne(params).lean();
    }

    createCarts = (videogame) => {
        return typesModel.create(videogame);
    }

    updateCarts = (id, videogame) => {
        return typesModel.updateOne({_id:id}, {$set:videogame})
    }

    deleteCarts = (id) => {
        return typesModel.deleteOne({_id:id});
    }
}