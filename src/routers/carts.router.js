import { Router} from "express";
import cartsManagers from "../dao/mongo/managers/cartsManager.js";

const router = Router();

const cartsService = new cartsManagers();

router.get("/", async(req,res)=>{
    const cart = [
        {title:"genshin impact", gender:"otome", price:"$USD: 500"},
        {title:"brawl stars", gender:"action", price:"$USD: 200"},
        {title:"super Mario Bros", gender:"aventure", price: "$USD: 300"}
    ];
    const result = await cartsService.insertMany(cart);
    res.send({status:"success", payload: result})
})

router.post("/", async(req, res) => {
    const {
        title,
        gender,
        price
    } = req.body;

    if (!title || !gender || !price) return res.status(400).send ({status: "error", error:"incomplete values"});
    const newCart = {
        title,
        gender,
        price
    }
    const result = await cartsService.createCarts(newCart);
    res.send({status:"success", payload:result._id})
})

export default router;


