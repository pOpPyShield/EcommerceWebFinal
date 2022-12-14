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
* sequelize-cli: >= 6.25.4
## Setup
1. Import /src/Config/DatabaseData/EcommerceWebSite.sql to mysql
2. Use sequelize-cli to migrate database
```
$ npx sequelize-cli init
```
_ Its auto create /config, /seeders, /models/index.js, migrations/
_ Change the host, username, password, database name, port in /config/config.json
3. Test the connect to see it connect
```
$ npx sequelize db:migrate status

Sequelize CLI [Node: 19.2.0, CLI: 6.5.2, ORM: 6.25.4]

Loaded configuration file "config/config.json".
Using environment "development".
```

4. To run this project, install it locally using npm:
```
$ npm install
$ npm run dev
```

5. In a production environment, the IP address and the port on which it runs might change every single time, depending on the server. Since we cannot hardcode the server port, we can solve it by using dotenv.

/src/index.js
```javascript
const express = require('express')
require("dotenv").config();
const app = express()
const port = process.env.PORT || 3000

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
```

6. Continuously log user requests with logger function
/src/Config/DatabaseConfig.js
```javascript
app.use(logger)
function logger(req, res, next) {
    console.log(req.originalUrl + " " + req.method)
    next()
}
```

7. Create connection variable
/src/Config/DatabaseConfig.js
```javascript
const mysql = require('mysql2')
require("dotenv").config();
const con = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_WORKING,
    port: process.env.DB_PORT
})
con.getConnection((err) => {
    if(err) throw err
    console.log("Db connected")
})
module.exports = con
```

## URL 
GET /: Display the login panel in line 25 of [index.js](/src/index.js)

POST /auth: 
* User send username and password data to server [Static/Js/LoginPage/loginReq.js](/src/Static/Js/LoginPage/loginReq.js)
* Server process request at [Api/v1/login.js](/src/Api/vi/login.js)
If user in db then server response
```json
{ 'COUNT(*)': 1 }
```
else
```json
{ 'COUNT(*)': 0 }
``` 

GET /dashboard: Display the dashboard panel [src/Views/Dashboard/IndexPage/index.ejs](/src/Views/Dashboard/IndexPage/index.ejs)

GET /category: Update UI dashboard when clicked in sidebar link [Views/Dashboard/partials/CategoryContainer/index.ejs](/src/Views/Dashboard/partials/CategoryContainer/index.ejs)

GET /product: Update UI dashboard when clicked in sidebar link [Views/Dashboard/partials/ProductContainer/index.ejs](/src/Views/Dashboard/partials/ProductContainer/index.ejs)

GET /rating: Update UI dashboard when clicked in sidebar link [Views/Dashboard/partials/RatingContainer/index.ejs](/src/Views/Dashboard/partials/RatingContainer/index.ejs)

GET /order: Update UI dashboard when clicked in sidebar link [Views/Dashboard/partials/OrderContainer/index.ejs](/src/Views/Dashboard/partials/OrderContainer/index.ejs)

GET /gender/data: Server response gender data as json object line 67 [index.js](src/index.js)
```json
[
    {
        "IdGender": 1,
        "Name": "Thời trang nam",
        "Created": "2022-11-30T02:32:36.000Z"
    },
    {
        "IdGender": 2,
        "Name": "Thời trang nữ",
        "Created": "2022-11-30T02:32:50.000Z"
    }
]
```

GET /category/data: Server response category data as json object line 58 [index.js](/src/index.js)
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

GET /product/data: Server response product data as json object line 93 [index.js](/src/index.js)
```json
[
    {
        "Name": "Áo khoác bomber nam dáng thể thao thời trang Zenkcos Men JK 2022",
        "Description": "sản phẩm: áo khoác nam.\r\nchất liệu mềm mại, thoáng mát, thấm hút mồ hôi.\r\nthiết kế thời trang phù hợp xu hướng hiện nay.\r\nkiểu dáng đơn giản, lịch sự, dễ phối đồ.\r\Now edit this file and set correct database credentials and dialect. The keys of the objects (e.g. "development") are used on model/.\r\nkích cỡ phù hợp với người dưới 65kg tùy chiều cao\r\nSize XS: cho bạn có cân nặng từ dưới 40kg tùy chiều cao\r\nSize S: cho bạn có cân nặng từ 40-47kg tùy chiều cao\r\nSize M: cho bạn có cân nặng từ 48-55kg tùy chiều cao\r\nSize L: cho bạn có cân nặng dưới 65kg tùy chiều cao",
        "Price": 55200,
        "Quantity": 25,
        "Size": "M"
    },
    {
        "Name": "Áo khoác bomber nam dáng thể thao thời trang Zenkcos Men JK 2022",
        "Description": "sản phẩm: áo khoác nam.\r\nchất liệu mềm mại, thoáng mát, thấm hút mồ hôi.\r\nthiết kế thời trang phù hợp xu hướng hiện nay.\r\nkiểu dáng đơn giản, lịch sự, dễ phối đồ.\r\nđường may chắc chắn tinh tế sắc sảo, thoải mái khi mặc.\r\náo được thiết kế với kiểu dáng đơn giản nhưng không kém phần trẻ trung, phong cách.\r\nthích hợp đi chơi, đi dạo phố.\r\nkích cỡ phù hợp với người dưới 65kg tùy chiều cao\r\nSize XS: cho bạn có cân nặng từ dưới 40kg tùy chiều cao\r\nSize S: cho bạn có cân nặng từ 40-47kg tùy chiều cao\r\nSize M: cho bạn có cân nặng từ 48-55kg tùy chiều cao\r\nSize L: cho bạn có cân nặng dưới 65kg tùy chiều cao",
        "Price": 55200,
        "Quantity": 24,
        "Size": "L"
    },
    {
        "Name": "Áo khoác bomber nam dáng thể thao thời trang Zenkcos Men JK 2022",
        "Description": "sản phẩm: áo khoác nam.\r\nchất liệu mềm mại, thoáng mát, thấm hút mồ hôi.\r\nthiết kế thời trang phù hợp xu hướng hiện nay.\r\nkiểu dáng đơn giản, lịch sự, dễ phối đồ.\r\nđường may chắc chắn tinh tế sắc sảo, thoải mái khi mặc.\r\náo được thiết kế với kiểu dáng đơn giản nhưng không kém phần trẻ trung, phong cách.\r\nthích hợp đi chơi, đi dạo phố.\r\nkích cỡ phù hợp với người dưới 65kg tùy chiều cao\r\nSize XS: cho bạn có cân nặng từ dưới 40kg tùy chiều cao\r\nSize S: cho bạn có cân nặng từ 40-47kg tùy chiều cao\r\nSize M: cho bạn có cân nặng từ 48-55kg tùy chiều cao\r\nSize L: cho bạn có cân nặng dưới 65kg tùy chiều cao",
        "Price": 55200,
        "Quantity": 24,
        "Size": "XL"
    },
    {
        "Name": "Áo khoác bomber nam dáng thể thao thời trang Zenkcos Men JK 2022",
        "Description": "sản phẩm: áo khoác nam.\r\nchất liệu mềm mại, thoáng mát, thấm hút mồ hôi.\r\nthiết kế thời trang phù hợp xu hướng hiện nay.\r\nkiểu dáng đơn giản, lịch sự, dễ phối đồ.\r\nđường may chắc chắn tinh tế sắc sảo, thoải mái khi mặc.\r\náo được thiết kế với kiểu dáng đơn giản nhưng không kém phần trẻ trung, phong cách.\r\nthích hợp đi chơi, đi dạo phố.\r\nkích cỡ phù hợp với người dưới 65kg tùy chiều cao\r\nSize XS: cho bạn có cân nặng từ dưới 40kg tùy chiều cao\r\nSize S: cho bạn có cân nặng từ 40-47kg tùy chiều cao\r\nSize M: cho bạn có cân nặng từ 48-55kg tùy chiều cao\r\nSize L: cho bạn có cân nặng dưới 65kg tùy chiều cao",
        "Price": 55200,
        "Quantity": 24,
        "Size": "XXL"
    }
]
```

GET /orders/data: Server response order data as json object line 106 [index.js](/src/index.js)
```json
[
    {
        "IdCustomer": 2,
        "Name": "Huy Bui",
        "Price": 55200,
        "Address": "K19238, Phuong Hoa Quy, Hoa Nhon",
        "Description": "Cho xem hang",
        "Size": "M",
        "Quantity": 2,
        "Created": "2022-12-01T13:41:27.000Z",
        "PhoneNumber": "12391277517238",
        "TotalPrice": 110000,
        "Status": "Cho Lay",
        "ExpectedDate": "2022-12-16T17:00:00.000Z"
    },
    {
        "IdCustomer": 2,
        "Name": "Huy Bui",
        "Price": 55200,
        "Address": "K19238, Phuong Hoa Quy, Hoa Nhon",
        "Description": "Cho xem hang",
        "Size": "M",
        "Quantity": 2,
        "Created": "2022-12-01T13:41:27.000Z",
        "PhoneNumber": "1231241251256612",
        "TotalPrice": 110000,
        "Status": "Cho Lay",
        "ExpectedDate": "2022-12-16T17:00:00.000Z"
    }
]
```

POST /ProcessCheckout: Send the post request as json object to server, server insert to CustomerOrders table
```json
{
    "prodNum": 1,
    "size": "M",
    "quantity": 2,
    "customerName": "Huy",
    "address": "K339, Phuong Hai Hoa, Quan Binh Thanh",
    "phoneNumber": "19232138"
}
```
Description column will be insert by admin


