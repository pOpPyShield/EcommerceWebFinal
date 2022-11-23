const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const authLog = require('./api/v1/login')
const pagesCss = {"Admin login": "index.css",
                "Dashboard": "index.css"}
const pagesName = Object.keys(pagesCss)
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
                                cssHref: pagesCss["Admin login"]
                            })
    })
app.post('/',authLog.authLogin,(req, res) => {
    userName = req.body.UserName
    res.send({UserName: req.body.UserName, redirect_path: "/Dashboard"})
    //res.send({UserName: req.body.UserName,redirect_path: "/dashboard"})
    authLog.con.end()
})
app.get('/dashboard', (req, res) => {
    res.render('Dashboard/IndexPage/index', {
                            UserName: userName,
                            title: pagesName[1],
                            cssHref: pagesCss["Dashboard"]
                        })
}) 
app.get('/tables', (req, res) => {
    res.render('Dashboard/tables')
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