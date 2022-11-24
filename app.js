const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
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
/* Render page for UI */
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
        return err ? res.json({message: "Error executing"}) : res.json(data)
    })
    conDb.end()
})
function logger(req, res, next) {
    console.log(req.originalUrl + " " + req.method)
    next()
}
const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

process.on("unhandledRejection", err => {
    console.log(`An error occured: ${err.message}`)
    server.close(() => process.exit(1))   
})