function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
function login(data) {
    var options  = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch("/auth", options) 
        .then((res) => res.json())
        .then((resp) =>  {
            if(resp.token) {
                setCookie('token', resp.token, 1)
                window.location.href=resp.redirect_path
            } else {
                alert("Some thing wrong with your username and password")
                document.querySelector("#username").value=""
                document.querySelector("#password").value=""
                window.location.reload()
            }
        })
        .catch((err) => {
            console.log(err)
        })
} 
function handleLoginForm() {
    var loginBtn = document.querySelector(".btn-primary")
    loginBtn.onclick = function() {
        var username = document.querySelector("#username").value
        var password = document.querySelector("#password").value
        var formdata = {username, password}
        login(formdata)
    }
}
handleLoginForm()     