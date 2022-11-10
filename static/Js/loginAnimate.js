            /*
            userName: document.querySelector("#username").value,
            password: document.querySelector("#password").value
            */
var loginAPI = "http://localhost:3000/"
function login(data) {
    var options  = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(loginAPI, options) 
        .then((res) => res.json())
        .then((resp) =>  {
            if(resp.redirect_path === "/") {
                alert("Some thing wrong with your username and password")
                document.querySelector("#username").value=""
                document.querySelector("#password").value=""
                window.location.reload()
            } else {
                window.location.href="http://localhost:3000"+resp.redirect_path+"?UserName="+resp.UserName
            }
        })
        .catch((err) => {
            console.log(err)
        })
} 
function handleLoginForm() {
    var loginBtn = document.querySelector(".btn-primary")
    loginBtn.onclick = function() {
        var UserName = document.querySelector("#username").value
        var Password = document.querySelector("#password").value
        var formData = {UserName, Password}
        login(formData)
    }
}
handleLoginForm()     