import { Router } from "express";
import videogameManager from "../dao/mongo/managers/videogameManager.js";

const router = Router();
const videogameService = new videogameManager();

router.get("/", async(req, res)=>{
    // let {page=1, limit=2} = req.query;
    // const pagination = await videogameService.paginateVideogames({}, {page,lean:true, limit});
    // res.render("Home",{
    //     videogame: pagination.docs,
    //     hasNextPage: pagination.hasNextPage,
    //     hasPrevPage: pagination.hasPrevPage,
    //     nextPage: pagination.nextPage,
    //     prevPage: pagination.prevPage,
    //     page: pagination.page
    // })
    if(!req.session.user){
        //Si ya murió la sesión, redirige al login
        return res.redirect('/login');
    }
    res.render('Profile',{user:req.session.user})
})

router.get('/product', async (req, res) => {
    if(!req.session.user) {
        return res.redirect("/login");
    }

    res.render('Home', {
        "id": 0,
        "title": "",
        "description": "",
        "price": 0,
        "thumbnail": "",
        "code": "",
        "stock": 1,
        "isNew": true
    });
});

router.get('/register',async(req,res)=>{
    res.render('Register')
})

router.get('/login',async(req,res)=>{
    res.render('Login')
})

router.get('/logout', async(req, res) => {
    if(!req.session.user) {
        return res.redirect("/login");
    }

    req.session.destroy(error => {
        if(error) {
            console.log(error);
            return res.redirect("/login");
        } else {
            return res.redirect("/login");
        }
    });
});

export default router;