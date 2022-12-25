function insertToDiv(name) {
    let pageName = "/" + name.toLowerCase()
    console.log(pageName)
    $(".container-fluid").load(pageName)
}
/*
$.each($("#collapsePages .collapse-item"), (value) => {
    $(value).text()
})
*/