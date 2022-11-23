function insertToDiv(name) {
    let pageName = "/" + name.toLowerCase()
    $(".container-fluid").load(pageName)
}
/*
$.each($("#collapsePages .collapse-item"), (value) => {
    $(value).text()
})
*/