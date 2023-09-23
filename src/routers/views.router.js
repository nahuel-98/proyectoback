import { Router } from "express";
import videogameManager from "../dao/mongo/managers/videogameManager.js";

const router = Router();
const videogameService = new videogameManager();

router.get("/", async(req, res)=>{
    let {page=1, limit=2} = req.query;
    const pagination = await videogameService.paginateVideogames({}, {page,lean:true, limit});
    res.render("Home",{
        videogame: pagination.docs,
        hasNextPage: pagination.hasNextPage,
        hasPrevPage: pagination.hasPrevPage,
        nextPage: pagination.nextPage,
        prevPage: pagination.prevPage,
        page: pagination.page
    })
})

export default router;