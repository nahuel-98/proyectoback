import express from "express";
import mongoose from "mongoose";
import videogameRouter from "./routers/videogame.router.js";
import viewsRouter from "./routers/views.router.js";
import Handlebars from "express-handlebars";
import __dirname from "./utils.js";
import cartsRouter from "./routers/carts.router.js"; 
import MongoStore from 'connect-mongo';
import sessionsRouter from './routers/sessions.router.js';
import session from 'express-session';
//import cookieParser from "cookie-parser";

const app = express();

app.use(session({
  store:MongoStore.create({
      mongoUrl:"mongodb+srv://nahuel98:123@cluster0.mxe8wdx.mongodb.net/GAB?retryWrites=true&w=majority",
      ttl:3600
  }),
  resave:false,
  saveUninitialized:false,
  secret:'papa'
}))

const PORT = process.env.PORT || 8081;


const connection = mongoose.connect( "mongodb+srv://nahuel98:123@cluster0.mxe8wdx.mongodb.net/GAB?retryWrites=true&w=majority");

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
//app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.engine("handlebars", Handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

//app.use(cookieParser("palabrasecretashhhhh"));

//app.get("/", (req, res)=> {
  //  const {accepted} = req.query;
    //if (accepted) {
      //  res
        //.cookie("cookievid", {title:"Arena of Valor", gender:"action"},{signed:true}).send({static:"success", payload: "Usuario"})
//        .cookie("cookieRIP", {name:"gaby", lastname:"lopez"}, {maxAge:5000})
  //  }
    //else{
  //      res.send({error:"No puedes seguir en la página"})
   // }
//});

//app.get("/getCookie",(req, res) => {
  //  console.log(req.cookies);
    //res.send(`Hola, ${req.cookies?.cookievid?.name}`)
//})

app.use("/", viewsRouter);
app.use('/api/sessions',sessionsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/videogames", videogameRouter);

const server = app.listen(PORT, () => console.log (`Listening ${PORT}`));
