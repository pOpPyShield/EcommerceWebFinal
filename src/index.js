const express = require('express')
require("dotenv").config();
const app = express()
const port = process.env.PORT || 3000
const path = require('path')

//import module to process json and db
const bodyParser = require('body-parser')
const authLog = require('./Api/login')
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
app.post('/auth',(req, res) => {
    (async () => {
        const result = await authLog.checkAdmin(req.body.UserName, req.body.Password)
        if (!(result === 1)) {
            res.send({redirect_path: "/"})
        } else {
            userName = req.body.UserName
            res.send({UserName: req.body.UserName, redirect_path: "/Dashboard"})
        }
    })()
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

/* Gender Api */
app.get('/gender/data', async (req, res) => {
    let conDB = require('./Config/DatabaseConfig')
    let queryStatement = "SELECT * FROM `Gender`"
    conDB.query(queryStatement, (err, data) => {
        if (!data) {
            res.json({status: "Error executing gender table"})
        } else {
            res.json(data)
        }
    })
})
/*End*/
/* Category Api*/
app.get('/category/data', async (req, res) => {
    let conDB = require('./Config/DatabaseConfig')
    let queryStatement = "SELECT * FROM `Category`"
    conDB.query(queryStatement, (err, data) => {
        if (!data) {
            res.json({status: "Error executing category table"})
        } else {
            res.json(data)
        }
    })
})
/* End*/
/* Product APi*/
app.get('/product/data', async (req, res) => {
    let conDB = require('./Config/DatabaseConfig')
    let queryStatement = "SELECT Product.Name, Product.Description, Product.Price, Quantity.Quantity, Size.Size FROM Product INNER JOIN Quantity ON Product.IdProduct=Quantity.IdProduct INNER JOIN Size ON Quantity.IdSize=Size.IdSize"
    conDB.query(queryStatement, (err, data) => {
        if (!data) {
            res.json({status: "Error executing category table"})
        } else {
            res.json(data)
        }
    })
})
/*End*/
/* CustomerOrders API */
app.get('/orders/data', async (req, res) => {
    let conDB = require('./Config/DatabaseConfig')
    let queryStatement = "SELECT CustomerOrders.IdCustomer, Product.Name, Product.Price, CustomerOrders.Name, CustomerOrders.Address, CustomerOrders.Description, CustomerOrders.Size, CustomerOrders.Quantity, CustomerOrders.Created, PhoneNumber.PhoneNumber, ShipThirdParty.TotalPrice,ShipThirdParty.Status,ShipThirdParty.ExpectedDate FROM CustomerOrders INNER JOIN Product ON Product.IdProduct=CustomerOrders.IdProduct INNER JOIN PhoneNumber ON PhoneNumber.IdCustomer = CustomerOrders.IdCustomer INNER JOIN ShipThirdParty ON ShipThirdParty.IdCustomer = CustomerOrders.IdCustomer"
    conDB.query(queryStatement, (err, data) => {
        if (!data) {
            res.json({status: "Error executing category table"})
        } else {
            res.json(data)
        }
    })
})
/*End*/
app.use((req, res) => {
    res.status(404).render('Error/404')
})
/* End */
const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

process.on("unhandledRejection", err => {
    console.log(`An error occured: ${err.message}`)
    server.close(() => process.exit(1))   
})