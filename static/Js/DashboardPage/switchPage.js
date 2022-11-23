function insertToDiv(name) {
    console.log(name.toLowerCase())
    var htmlCtn = ejs.render('Dashboard/tables')
    $(".container-fluid").html(htmlCtn)
}
/*
$.each($("#collapsePages .collapse-item"), (value) => {
    $(value).text()
})
*/