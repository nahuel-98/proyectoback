import { Router} from "express";
import cartsManagers from "../dao/mongo/managers/cartsManager.js";

const router = Router();
const cartsService = new cartsManagers();

router.get("/", async(req,res)=>{
    const result = await cartsService.getcarts();
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


