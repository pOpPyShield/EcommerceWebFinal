const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const app = express()
const port = 3000
var con = mysql.createConnection({
    host: "localhost",
    user: "huyroot",
    password: "Abcd1234",
    database: "EcommerceWebSite"
})
const pagesCss = {"Admin login": "index.css",
                "Dashboard": "index.css"}
const pagesName = Object.keys(pagesCss)
//Set the view engine to ejs
app.set('view engine', 'ejs')

//Serving static files
app.use(express.static('static'))

//Use body-parser to encoded message
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.render('index', {
                            title: pagesName[0],
                            cssHref: pagesCss["Admin login"]
                        })
})
app.get('/dashboard', (req, res) => {
    res.render('dashboard', {
                            title: pagesName[1],
                            cssHref: pagesCss["Dashboard"]
                        })
})

app.post('/login-process', (req, res) => {
    (async () => {
        con.connect()
        const result = await checkAdmin(req.body.userName, req.body.password)
        con.end()
        if (result === 1) {
            res.redirect('/dashboard')
        } else {
            res.redirect('/')
        }
    })()
})
function checkAdmin(userName, password) {
    let queryStatement = "SELECT COUNT(*) FROM `Admin` WHERE UserName='" + userName +"' and Password='" + password +"'"
    return new Promise((resolve, reject) => {
        con.query(queryStatement, (err, result) => {
            return err ? reject(err) : resolve(result[0]['COUNT(*)'])
        })
    })
}
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})