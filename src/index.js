const express = require('express')
const fileUpload = require('express-fileupload')
//const formData = require("express-form-data");
require("dotenv").config();
const app = express()
// Default options
app.use(fileUpload())
//spyRoutes(app)
const port = process.env.PORT || 3000
const path = require('path')
//Import services
const ProductService = require("./services/productservices")
const GenderService = require("./services/genderservices")
//import module to process json and db
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
app.use(cookieParser())
//Use middle ware to catch request from user
const logger = require('./middlewares/logger');
app.use(logger.logger)

//Use controllers
const LoginController = require('./controllers/logincontroller')
const CategoryController = require('./controllers/categorycontroller')
const GenderController = require('./controllers/gendercontroller')
const ProductController = require('./controllers/productcontroller')
//Set the view engine to ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'Views'))

//Serving static files
app.use(express.static(__dirname+'/Static'))
app.use('/GenderImg', express.static(__dirname+'/Static/imgs/GenderImg/'))
app.use('/ProductImg', express.static(__dirname+'/Static/imgs/ProductImg/'))
//Use body-parser to encoded message
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

//Routes
var ui = require('./routes/ui');
const authenticateToken = require('./middlewares/authenticateToken');
const api = require('./routes/api')
//Display login UI
app.get('/', authenticateToken,ui.login)
app.post('/auth',LoginController.checkCredentials)
/* Render page for dashboard */
app.get('/dashboard', authenticateToken,ui.dashboard) 
app.get('/gender', authenticateToken, ui.gender)
app.post('/gender/create', authenticateToken, GenderController.insertGender)
app.post('/gender/delete', authenticateToken, GenderController.deleteGender)
app.post('/gender/update', authenticateToken, GenderController.updateGender)
/* Render page for category */
app.get('/category',authenticateToken, ui.category)
app.post('/category/create', authenticateToken,CategoryController.insertCategory)
app.post('/category/update', authenticateToken,CategoryController.updateCategory)
app.post('/category/delete', authenticateToken,CategoryController.deleteCategory)
/* Render page for product */
app.get('/product',authenticateToken, ui.product)
app.post('/product/create', authenticateToken, ProductController.addProduct)
app.post('/product/update', authenticateToken, ProductController.updateProduct)
app.post('/product/delete', authenticateToken, ProductController.deleteProduct)
/* Render page for rating */
app.get('/rating',authenticateToken, (req, res) => {
    res.render('Dashboard/partials/ratingContainer/')
})
/* Render page for order */
app.get('/order',authenticateToken, (req, res) => {
    res.render('Dashboard/partials/orderContainer/')
})
/* End */

/* Gender API */
app.get('/gender/all', api.getAllGender)
app.get('/category/all', api.getAllCate)
app.get('/product/all', api.getAllProduct)
/*End*/

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