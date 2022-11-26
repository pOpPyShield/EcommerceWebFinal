const express = require('express')
require("dotenv").config();
const app = express()
const port = process.env.PORT || 3000
const path = require('path')

//import module to process json and db
const bodyParser = require('body-parser')
const authLog = require('./Api/login')
const conDb = require('./Config/DatabaseConfig')
const pagesName = ["Admin login", "Dashboard"]
var userName = ""

//Use middle ware to catch request from user
const logger = require('./Api/Middlewares/Logger')
app.use(logger.logger)

//Set the view engine to ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'Views'))

//Serving static files
app.use(express.static(__dirname+'/Static'))

//Use body-parser to encoded message
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

//Display login UI
app.get('/', (req, res) => {
        res.render('Login/index', {
                                title: pagesName[0],
                            })
    })
app.post('/auth',authLog.authLogin,(req, res) => {
    userName = req.body.UserName
    res.send({UserName: req.body.UserName, redirect_path: "/Dashboard"})
    //res.send({UserName: req.body.UserName,redirect_path: "/dashboard"})
    authLog.con.end()
})
/* Render page for dashboard */
app.get('/dashboard', (req, res) => {
    res.render('Dashboard/', {
                            UserName: userName,
                            title: pagesName[1],
                        })
}) 
app.get('/category', (req, res) => {
    res.render('Dashboard/partials/categoryContainer/')
})
app.get('/product', (req, res) => {
    res.render('Dashboard/partials/productContainer/')
})
app.get('/rating', (req, res) => {
    res.render('Dashboard/partials/ratingContainer/')
})
app.get('/order', (req, res) => {
    res.render('Dashboard/partials/orderContainer/')
})
/* End */

/* Category Api*/
app.get('/category/data', async (req, res) => {
    let queryStatement = "SELECT * FROM `Category`"
    conDb.query(queryStatement, (err, data) => {
        console.log(data)
        if (!data) {
            res.json({status: "Error executing"})
        } else {
            res.json(data)
        }
    })
    conDb.end()
})
/* End*/

/* End */
const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

process.on("unhandledRejection", err => {
    console.log(`An error occured: ${err.message}`)
    server.close(() => process.exit(1))   
})