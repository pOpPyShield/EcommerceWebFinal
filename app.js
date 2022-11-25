const express = require('express')
require("dotenv").config();
const app = express()
const port = process.env.PORT || 3000

//import module to process json and db
const bodyParser = require('body-parser')
const authLog = require('./api/v1/login')
const conDb = require('./database/db')
const pagesName = ["Admin login", "Dashboard"]
var userName = ""

//Set the view engine to ejs
app.set('view engine', 'ejs')

//Serving static files
app.use(express.static('static'))
app.use(logger)

//Use body-parser to encoded message
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

//Get the U
app.get('/', (req, res) => {
        res.render('Login/index', {
                                title: pagesName[0],
                            })
    })
app.post('/',authLog.authLogin,(req, res) => {
    userName = req.body.UserName
    res.send({UserName: req.body.UserName, redirect_path: "/Dashboard"})
    //res.send({UserName: req.body.UserName,redirect_path: "/dashboard"})
    authLog.con.end()
})
/* Render page for dashboard */
app.get('/dashboard', (req, res) => {
    res.render('Dashboard/IndexPage/index', {
                            UserName: userName,
                            title: pagesName[1],
                        })
}) 
app.get('/category', (req, res) => {
    res.render('Dashboard/partials/categoryContainer/index')
})
app.get('/product', (req, res) => {
    res.render('Dashboard/partials/productContainer/index')
})
app.get('/rating', (req, res) => {
    res.render('Dashboard/partials/ratingContainer/index')
})
app.get('/order', (req, res) => {
    res.render('Dashboard/partials/orderContainer/index')
})
/* End */

/* Category Api*/
app.get('/category/data', (req, res) => {
    let queryStatement = "SELECT * FROM `Category`"
    conDb.query(queryStatement, (err, data) => {
        console.log(data)
        if (!data) {
            res.json({status: "Error executing"})
        } else {
            res.json(data)
            //console.log(data[0].Id)
        }
    })
    conDb.end()
})
/* End*/

/* Log the request to console*/
function logger(req, res, next) {
    console.log(req.originalUrl + " " + req.method)
    next()
}
/* End */
const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

process.on("unhandledRejection", err => {
    console.log(`An error occured: ${err.message}`)
    server.close(() => process.exit(1))   
})