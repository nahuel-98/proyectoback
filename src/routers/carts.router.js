import { Router} from "express";
import cartsManagers from "../dao/mongo/managers/cartsManager.js";

const router = Router();
const cartsService = new cartsManagers();

router.get("/", async(req,res)=>{
    const result = await cartsService.getcarts().populate("Juegos");
    res.send({status:"success", payload: result})
})

router.post("/", async(req, res) => {
    const {
        description,
        added,
        price
    } = req.body;

    if (!description || !added || !price) return res.status(400).send ({status: "error", error:"incomplete values"});
    const newCart = {
        description,
        added,
        price
    }
    const result = await cartsService.createCarts(newCart);
    res.send({status:"success", payload:result._id})
})

router.put("/:cart", async(req,res) =>{
    const {cart} = req.params;
    const{
        description,
        added,
        price
    } = req.body;

    const updateCarts = {
        description,
        added,
        price
    }

    const carts = await cartsService.updateCarts({_id:cart});
    if(!carts) return res.status(400).send({status:"error",error:"El carrito no existe"});
    await cartsService.updateCarts(cart,updateCarts);
    res.send({status:"success",message:"Carrito actualizado"});
})

router.delete("/:cart", async(req, res) => {
    const {cart} = req.params;
    const result = await cartsService.deleteCarts(cart);
    res.send({status:"success", menssage: "Carrito borrado"})
})

export default router;


