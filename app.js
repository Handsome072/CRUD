import express from "express";
import path from 'path'
import expressEjsLayouts from 'express-ejs-layouts'
import homeRoute from './routes/HomeRouter.js'



const application = express()

application.use(expressEjsLayouts)

application.set('view engine', 'ejs')
application.use(express.static(path.resolve('public')))
application.use(express.urlencoded({extended:false}))


application.use('/', homeRoute)

application.listen(1500 , () => {
    console.log('http://127.0.0.1:1500')
})

