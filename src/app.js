import express from "express";
import mongoose from "mongoose";
import videogamesRouter from "./routers/videogames.router.js";
import viewsRouter from "./routers/views.router.js";
import Handlebars from "express-handlebars";
import __dirname from "./utils.js";
import cartsRouter from "./routers/carts.router.js"; 

const app = express();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => console.log (`Listening ${PORT}`));

const connection = mongoose.connect( "mongodb+srv://CoderUser:123@cluster0.cft2mln.mongodb.net/coderGaming?retryWrites=true&w=majority ");

app.engine("handlebars", Handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
app.use("/api/videogames", videogamesRouter);