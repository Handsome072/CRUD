import { Router } from "express";
import { home, insert, search, suppr, update, view } from "../controllers/HomeController.js";



const homeRoute = Router();


homeRoute.get('/', home)
homeRoute.get('/insert', insert)
homeRoute.post('/insert', insert)

homeRoute.get('/view/:id' , view)
homeRoute.get('/update/:id' , update)
homeRoute.post('/update/:id' , update)
homeRoute.get('/delete/:id' , suppr)
homeRoute.get('/search' , search)
export default homeRoute