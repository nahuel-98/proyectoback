import { Router } from "express";
import videogamesManager from "../dao/mongo/managers/videogamesManager.js";
import uploader from "../service/uploadService.js";
import videogameModel from "../dao/mongo/models/videogames.js";

const router = Router();
const videogamesService = new videogamesManager();

router.get("/", async(req, res) => {
    const videogames = await videogamesService.getVideogames();
    res.send({status:"success", payload:videogames})
})

router.get("/indexacion", async (req,res) => {
    const ind = await videogameModel.find({title:"Brawl Stars"}).explain("executionStats");
    console.log(ind);
    res.sendStatus(200);
})

router.post("/", uploader.array("images"), async(req, res) => {
    console.log(req.files);
    console.log(req.body);
    const {
        title,
        gender,
        price
    } = req.body;

    if (!title || !gender || !price) return res.status(400).send({status:"error", error:"incomplete values"});

    const newVideogames = {
        title,
        gender,
        price
    }
    const images = req.files.map(file => `${req.protocol}://${req.hostname}:${process.env.PORT || 8080}/img/${file.filename}`);
    newVideogames.images = images

    const result = await videogamesService.createVideogame(newVideogames);
    
    res.send({status: "success", payload:result._id});
})

router.put("/:vid", async(req,res) => {
    const {vid} = req.params;
    const {
        title,
        gender,
        price
    } = req.body;

    const updateVideogame = {
        title,
        gender,
        price
    }

    const videogame = await videogamesService.getVideogameBy({_id:vid});
    if(!videogame) return res.status(400).send({status:"error",error:"El videojuego no existe"});
    await videogamesService.updateVideogame(vid,updateVideogame);
    res.send({status:"success",message:"Videojuego actualizado"});
})

router.delete("/:vid", async(req,res) => {
    const {vid} = req.params;
    const result = await videogamesService.deleteVideogame(vid);
    res.send({status: "success", menssage: "videojuego borrado"})
})

export default router;