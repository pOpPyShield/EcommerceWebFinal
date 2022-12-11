const express = require('express')
require("dotenv").config();
const app = express()
const port = process.env.PORT || 3000
const path = require('path')
//Import sequelize models 
const {Op} = require("sequelize")
const Gender = require("./Models/Gender.model")
const Category = require("./Models/Category.model");
const Size = require("./Models/Size.model")
const Image = require("./Models/Image.model")
const CustomerOrder = require('./Models/CustomerOrder.model');
const PhoneNumber = require('./Models/PhoneNumber.model')
const CheckOut = require('./Models/Checkout.model')
const {insertInstance} = require("./Config/DatabaseConfig")
//import module to process json and db
const bodyParser = require('body-parser')
const pagesName = ["Admin login", "Dashboard"]
var userName = ""

//Use middle ware to catch request from user
const logger = require('./Api/Middlewares/Logger');
const Product = require('./Models/Product.model');
const Admin = require('./Models/Admin.model');
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
    const checkAdmin = (async() => {
        var admin  = await Admin.findAll({
            where: {
                [Op.and]: [{UserName: req.body.UserName}, {Password:req.body.Password}]
            }
        });
        if(admin.length >0) {
            userName = admin[0].UserName
            res.json({UserName: admin[0].UserName,redirect_path: "/Dashboard"})
        } else {
            res.json({redirect_path: "/"})
        }
    })
    checkAdmin()
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

/* Product APi*/
app.get('/product/data',(req, res) => {
    (async() => {
            const products  = await Gender.findAll({
                include: [ 
                    {
                        model: Category,
                        required: true,
                        include: {
                            model: Product,
                            required: true,
                            include: [
                                {
                                    model: Size,
                                    required: true
                                },
                                {
                                    model: Image,
                                    required: true
                                }
                            ]
                        }
                    }
                ]
            });
            // Now the ship comes with it
            res.json(products)
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
            var quantity = 0
            var checkOutArr = []
            for (let i in products) {
                checkOutArr.push(await CheckOut.create({
                    ProductIdProduct: products[i].prodNum,
                    CustomerOrderIdCustomer: customerOrder.IdCustomer
                }))
                quantity += products[i].quantity
            }
            const cusFind = await CustomerOrder.findOne({where: {IdCustomer: customerOrder.IdCustomer}})
            console.log(cusFind)
            cusFind.Quantity = parseInt(quantity)
            await cusFind.save()
            /*
            var product = await Product.findOne({where: {IdProduct: parseInt(req.body.prodNum)}})
            var checkout = await CheckOut.create({
                CustomerOrderIdCustomer: customerOrder.IdCustomer,
                ProductIdProduct: product.IdProduct
            })
            res.json(checkout)
            */
        })()
    })
    /*
   var prodNum = parseInt(req.body.prodNum)
   var size = req.body.size
   var quantity = parseInt(req.body.quantity)
   var customerName = req.body.customerName
   var phoneNumber = req.body.phoneNumber
   var address = req.body.address
   var description = "Cho khach xem hang"

   var sql = `INSERT INTO CustomerOrders(Name, Address, Description,IdProduct, Size, Quantity) VALUES ("${customerName}", "${address}", "${description}", ${prodNum}, "${size}", ${quantity})`
   authLog.con.query(sql, (err, data) => {
        if (err) throw err
        console.log(data)
   })
   */
/**/
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