import videogameModel from "../models/videogames.js";

export default class videogamesManager {
    
    getVideogames = (params) => {
        return videogameModel.find(params).lean();
    }

    getVideogameBy = (params) => {
        return videogameModel.findOne(params).lean();
    }

    createVideogame = (videogame) => {
        return videogameModel.create(videogame);
    }

    updateVideogame = (id, videogame) => {
        return videogameModel.updateOne({_id:id}, {$set:videogame})
    }

    deleteVideogame = (id) => {
        return videogameModel.deleteOne({_id:id});
    }
}