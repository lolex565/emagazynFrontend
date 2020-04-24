window.onload = userCreator();

function userCreator() {
    var form = document.getElementById("useraddform");
    if(localStorage.role.includes("admin")){
        form.innerHTML = "Login nowego użytkownika: <input id=\"username\" type=\"text\" /><br />Hasło nowego użytkownika: <input id=\"password\" type=\"password\" />"
    } else {
        form.innerHTML  = "<h2>Nie powinno cię tu być</h2>"
    }
}