window.onload = adminVerify();
function adminVerify() {
    var resultElement = document.getElementById('result');
    if (localStorage.role.includes("admin")) {
        resultElement.innerHTML = "<input type=\"button\" onclick=\"window.location = \'adminpages/userlist.html\'\" value=\"pokaż liste użytkowników\"><input type=\"button\" onclick=\"window.location = \'adminpages/adduser.html\'\" value=\"dodaj użytkownika\"></input><input type=\"button\" value=\"usuń użytkownika\"></input><input type=\"button\" value=\"zresetuj hasło\"></input><input type=\"button\" value=\"zmień uprawnienia użytkownika\"></input>";
    } else {
        resultElement.innerHTML = "<h2 class=\"splash\">Nie powinno cię tu być</h2>";
    }
}

