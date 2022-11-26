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

app.js
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
GET /: Display the login panel in line 25 of [app.js](app.js)

POST /auth: 
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
```json
[
    {
        "Id": 1,
        "IdxAdmin": 4,
        "Name": "fjweifjweifjwifjwijiewjfvnxbcnvxvbuqewhfuwh83rsdjnjvsn",
        "Modify": "2022-11-24T01:33:43.000Z"
    },
    {
        "Id": 2,
        "IdxAdmin": 4,
        "Name": "KAJSDj\r\nKAsd\r\nKASDASK\r\nKASdask",
        "Modify": "2022-11-24T01:34:14.000Z"
    },
    {
        "Id": 3,
        "IdxAdmin": 4,
        "Name": "_a asdjasj\r\n_ sadas\r\n*asdjiasjai\r\n*Sdiaos\r\n_asdasd",
        "Modify": "2022-11-24T01:35:04.000Z"
    },
    {
        "Id": 4,
        "IdxAdmin": 4,
        "Name": "_ jasdjasjsa\r\n_ jjjjajaja\r\n_ asdqwi",
        "Modify": "2022-11-24T01:38:04.000Z"
    }
]
```
