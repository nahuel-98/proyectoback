import typesModel from "../models/carts.js";

export default class cartsManager {
    
    getVideogames = (params) => {
        return typesModel.find(params).lean();
    }

    getVideogameBy = (params) => {
        return typesModel.findOne(params).lean();
    }

    createVideogame = (videogame) => {
        return typesModel.create(videogame);
    }

    updateVideogame = (id, videogame) => {
        return typesModel.updateOne({_id:id}, {$set:videogame})
    }

    deleteVideogame = (id) => {
        return typesModel.deleteOne({_id:id});
    }
}