const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const authLog = require('./algo/login')
const pagesCss = {"Admin login": "index.css",
                "Dashboard": "index.css"}
const pagesName = Object.keys(pagesCss)
//Set the view engine to ejs
app.set('view engine', 'ejs')
//Serving static files
app.use(express.static('static'))
app.use(logger)
//Use body-parser to encoded message
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
        res.render('index', {
                                title: pagesName[0],
                                cssHref: pagesCss["Admin login"]
                            })
    })
app.post('/',authLog.authLogin,(req, res) => {
    res.send({UserName: req.body.UserName, redirect_path: "/dashboard"})
    //res.send({UserName: req.body.UserName,redirect_path: "/dashboard"})
    authLog.con.end()
})
app.get('/dashboard', (req, res) => {
    res.render('dashboard', {
                            UserName: req.query.UserName,
                            title: pagesName[1],
                            cssHref: pagesCss["Dashboard"]
                        })
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