import { Router } from "express";
import videogamesManager from "../dao/mongo/managers/videogamesManager.js";
import uploader from "../service/uploadService.js";

const router = Router();
const videogamesService = new videogamesManager();

router.get("/", async(req, res) => {
    const videogames = await videogamesService.find();
    res.send({status:"success", payload:videogames})
})

router.post("/", uploader.array("images"), async(req, res) => {
    console.log(req.files);
    console.log(req.body);
    const {
        title,
        description,
        price,
        categories
    } = req.body;

    if (!title || !description || !price) return res.status(400).send({status:"error", error:"incomplete values"});

    const newVideogames = {
        title,
        description,
        price,
        categories
    }
    const images = req.files.map(file => `${req.protocol}://${req.hostname}:${process.env.PORT || 8080}/img/${file.filename}`);
    newVideogames.images = images

    const result = await videogamesService.createVideogame(newVideogames);
    
    res.send({status: "success", payload:result._id});
})

export default router;