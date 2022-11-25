# EcommerceWebFinal
Simple Ecommerce website with nodejs, mysql

## Table of Contents
* [ENV info](#env-info)
* [Packages](#packages)
* [Setup](#setup)
* [URL](#url)
## ENV info
DB_HOST=localhost
DB_USER=huyroot
DB_PASS=Abcd1234
DB_WORKING=EcommerceWebSite

## Packages
Project is created with:
* body-parser: >= 1.20.1
* dotenv: >= 16.0.3
* ejs: >= 3.1.8
* express: >= 4.18.2
* jquery: >= 3.6.2
* mysql: >= 2.18.1
* mysql2: >= 3.0.0-rc.1
* sequelize: >= 6.25.4

## Setup
Import /database/dbDeploy/EcommerceWebSite.sql to mysql

To run this project, install it locally using npm:
```
$ npm install
$ npm run dev
```

In a production environment, the IP address and the port on which it runs might change every single time, depending on the server. Since we cannot hardcode the server port, we can solve it by using dotenv.
/app.js
```javascript
const express = require('express')
require("dotenv").config();
const app = express()
const port = process.env.PORT || 3000

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
```

Continuously log user requests with logger function
/app.js
```javascript
app.use(logger)
function logger(req, res, next) {
    console.log(req.originalUrl + " " + req.method)
    next()
}
```

Create connection variable
/database/db.js
```javascript
const mysql = require('mysql')
require("dotenv").config();
const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_WORKING
})
async () => {
    await con.connect((err) => {
        if (err) throw err
    })
    console.log("Connected!")
}
module.exports = con
```

## URL 
GET /: Display the login panel in line 49 of[app.js](app.js)

POST /: 
* User send username and password data to server [static/Js/LoginPage/loginReq.js](static/Js/LoginPage/loginReq.js)
* Server process request at [api/v1/login.js](/api/vi/login.js)
If user in db then server response
```json
{ 'COUNT(*)': 1 }
```
else
```json
{ 'COUNT(*)': 0 }
``` 

GET /dashboard: Display the dashboard panel [views/Dashboard/IndexPage/index.ejs](views/Dashboard/IndexPage/index.ejs)
GET /category: Update UI dashboard when clicked in sidebar link [views/Dashboard/partials/CategoryContainer/index.ejs](views/Dashboard/partials/CategoryContainer/index.ejs)
GET /product: Update UI dashboard when clicked in sidebar link [views/Dashboard/partials/ProductContainer/index.ejs](views/Dashboard/partials/ProductContainer/index.ejs)
GET /rating: Update UI dashboard when clicked in sidebar link [views/Dashboard/partials/RatingContainer/index.ejs](views/Dashboard/partials/RatingContainer/index.ejs)
GET /order: Update UI dashboard when clicked in sidebar link [views/Dashboard/partials/OrderContainer/index.ejs](views/Dashboard/partials/OrderContainer/index.ejs)
GET /category/data: Server response category data as json object line 58 [app.js](app.js)
