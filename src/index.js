const express = require('express')
require("dotenv").config();
const app = express()
const port = process.env.PORT || 3000
const path = require('path')
//Import sequelize models 
const ProductService = require("./services/productservices")
const GenderService = require(".//services/genderservices")
//import module to process json and db
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
app.use(cookieParser())
//Use middle ware to catch request from user
const logger = require('./middlewares/logger');
app.use(logger.logger)

//Use controllers
const LoginController = require('./controllers/logincontroller')
//Set the view engine to ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'Views'))

//Serving static files
app.use(express.static(__dirname+'/Static'))

//Use body-parser to encoded message
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

//Routes
var ui = require('./routes/ui');
const authenticateToken = require('./middlewares/authenticateToken');
//Display login UI
app.get('/', ui.login)
app.post('/auth',LoginController.checkCredentials)
/* Render page for dashboard */
app.get('/dashboard', authenticateToken,ui.dashboard) 
app.get('/category',(req, res) => {
    res.render('Dashboard/partials/categoryContainer/')
})
app.get('/product', (req, res) => {
    res.render('Dashboard/partials/productContainer/')
})
app.get('/rating',(req, res) => {
    res.render('Dashboard/partials/ratingContainer/')
})
app.get('/order', (req, res) => {
    res.render('Dashboard/partials/orderContainer/')
})
/* End */

/* Gender API */
app.get('/gender/all', (req, res) => {
    (async() => {
        res.json(await GenderService.getAllGenders())
    })()
})
/*End*/

/* Product APi*/
app.get('/product/all',(req, res) => {
    (async() => {
        // Now the ship comes with it
        res.json(await ProductService.getAllProducts())
    })()
})
app.get('/product/:id', (req, res) => {
    (async() => {
        res.json(await ProductService.getOneProduct(req.params.id))
    })()
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
/* Get View CheckOut */
app.get('/checkout', (req, res) => {
    res.render('Checkout/')
})
app.post('/ProcessCheckout', (req, res) => {
    (async() => {
            var customerOrder = new CustomerOrder({
                Name: req.body.customerName,
                Size: req.body.size,
                Address: req.body.address,
            })
            await customerOrder.save()
            var phone = await PhoneNumber.create({
                PhoneNumber: req.body.phoneNumber,
                CustomerOrderIdCustomer: customerOrder.IdCustomer
            })
            var products = req.body.products
            var checkOutArr = []
            var quantity = 0
            for (let i in products) {
                checkOutArr.push(await CheckOut.create({
                    ProductIdProduct: products[i].prodNum,
                    CustomerOrderIdCustomer: customerOrder.IdCustomer
                }))
                quantity += parseInt(products[i].quantity)
            }
            const cusFind = await CustomerOrder.findOne({where: {IdCustomer: customerOrder.IdCustomer}})
            cusFind.Quantity = quantity
            await cusFind.save()
        })()
    })
/**/
app.use(ui.page404)
/* End */
const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

process.on("unhandledRejection", err => {
    console.log(`An error occured: ${err.message}`)
    server.close(() => process.exit(1))   
})