const express = require('express')
const app = express()
const port = 3000
const pagesCss = {"Admin login": "index.css",
                "Dashboard": "index.css"}
const pagesName = Object.keys(pagesCss)
//Set the view engine to ejs
app.set('view engine', 'ejs')

//Serving static files
app.use(express.static('static'))
app.get('/login', (req, res) => {
    res.render('index', {
                            title: pagesName[0],
                            cssHref: pagesCss["Admin login"]
                        })
})
app.get('/', (req, res) => {
    res.render('index', {
                            title: pagesName[1],
                            cssHref: pagesCss["Dashboard"]
                        })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})