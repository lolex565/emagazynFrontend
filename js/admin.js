window.onload = adminVerify();
function adminVerify() {
    var resultElement = document.getElementById('result');
    var xhr = new XMLHttpRequest;
    var url = 'http://3.11.101.223:3001/user/auth/authorize'
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');
    xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://3.11.101.223:3001/user/auth/authorize');
    xhr.setRequestHeader('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE, HEAD, OPTIONS");
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.setRequestHeader("Authorization", "Bearer " + localStorage.token);
    xhr.addEventListener('load', function() {
      var responseObject = JSON.parse(this.response);
      if (responseObject.success) {
        if (localStorage.role.includes("admin")) {
            resultElement.innerHTML = "<input type=\"button\" onclick=\"window.location = \'adminpages/userlist.html\'\" value=\"pokaż liste użytkowników\"><input type=\"button\" onclick=\"window.location = \'adminpages/deluser.html\'\" value=\"usuń użytkownika\"></input><input type=\"button\" value=\"usuń użytkownika\"></input><input type=\"button\" value=\"zresetuj hasło\"></input><input type=\"button\" value=\"zmień uprawnienia użytkownika\"></input>";
        } else {
            resultElement.innerHTML = "<h2 class=\"splash\">Nie powinno cię tu być</h2>";
        }
      } else {
        resultElement.innerHTML = "<h2 class=\"splash\">Token się nie zgadza<br />zaloguj sie jeszcze raz i spróbuj ponownie</h2>"
      }
    });
    xhr.send(null);
}

