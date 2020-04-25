function register() {
    var registerUrl = "http://3.11.101.223:3001/user/auth/register";
    var xhr = new XMLHttpRequest();
    var userElement = document.getElementById('username');
    var passwordElement = document.getElementById('password');
    var user = userElement.value;
    var password = passwordElement.value;
  
    xhr.open('POST', registerUrl, true);
    xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');
    xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://3.11.101.223:3001/user/auth/register');
    xhr.setRequestHeader('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE, HEAD, OPTIONS");
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.addEventListener('load', function() {
        var responseObject = JSON.parse(this.response);
        if (responseObject.token) {
            localStorage.setItem('token', responseObject.token);
            redirectToLanding();
        } else {
            localStorage.setItem('token', "No token received");
            var resultElement = document.getElementById('register_form');
            resultElement.innerHTML = "nie udało się utworzyć użytkownika";
        }
    });
    var sendObject = JSON.stringify({password: password, email: user});
    xhr.send(sendObject);
  }

  