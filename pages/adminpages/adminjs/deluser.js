window.onload = userDeleterForm();

function userDeleterForm() {
    var form = document.getElementById("useraddform");
    if(localStorage.role.includes("admin")){
        form.innerHTML = "email  użytkownika do usunięcia: <input id=\"username\" type=\"text\" /><input type=\"button\" onclick=\"userDeleter()\" value=\"usuń użytkownika\">"
    } else {
        form.innerHTML  = "<h2>Nie powinno cię tu być</h2>"
    }
}

function userDeleter() {
    var temp = "czy napewno chcesz usunąć użytkownika: ";
    var userElement = document.getElementById("username");
    var user = userElement.value;
    temp += user;
    if(confirm(temp)) {
        var url = 'http://3.11.101.223:3001/admin/users/user'
        xhr.open('DELETE', url, true);
        xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');
        xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://3.11.101.223:3001/');
        xhr.setRequestHeader('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE, HEAD, OPTIONS");
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.addEventListener('load', function() {
            var responseObject = JSON.parse(this.response);
            //console.log(responseObject);
            if (responseObject.token) {
            localStorage.setItem('token', responseObject.token);
            
            } else {
            
            }
        });
    
      var sendObject = JSON.stringify({password: password, username: user});
      xhr.send(sendObject);
    }else {

    }
}