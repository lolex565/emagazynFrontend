window.onload = showUserList();

function showUserList() {
    var url = 'http://3.11.101.223:3001/admin/users';
    var resultElement = document.getElementById('userlist');
    var xhr = new XMLHttpRequest();
    var tokenElement = localStorage.token;
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://3.10.225.17:3001/admin/users');
    xhr.setRequestHeader("Authorization", "Bearer " + tokenElement);
    xhr.onreadystatechange = function (aEvt) {
        if(xhr.readyState == 4){
            if(xhr.status == 200 || xhr.status == 304 || xhr.status == 203){
                var responseObject = JSON.parse(this.response);
                resultElement.innerHTML += "<ul>";
                for (var i = 0; i < responseObject.length; i++) {
                    resultElement.innerHTML += "<li>";
                    resultElement.innerHTML += responseObject[i].email;
                    resultElement.innerHTML += "</li>";
                }
                resultElement.innerHTML += "</ul>";
            }
        }
    };
    xhr.send(null);
}