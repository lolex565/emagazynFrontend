function getToken() {
  var loginUrl = "http://3.11.101.223:3001/user/auth/login";
  var xhr = new XMLHttpRequest();
  var userElement = document.getElementById('username');
  var passwordElement = document.getElementById('password');
  var user = userElement.value;
  var password = passwordElement.value;
    
  xhr.open('POST', loginUrl, true);
  xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');
  xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://3.11.101.223:3001/');
  xhr.setRequestHeader('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE, HEAD, OPTIONS");
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xhr.addEventListener('load', function() {
    var responseObject = JSON.parse(this.response);
    //console.log(responseObject);
    if (responseObject.token) {
      localStorage.setItem('token', responseObject.token);
      redirectToLanding();
    } else {
      localStorage.setItem('token', "No token received");
    }
  });
    
  var sendObject = JSON.stringify({password: password, username: user});
  xhr.send(sendObject);
}    



function checkToken(){
  if (localStorage.token != undefined) {
    var token = localStorage.token;
    var authUrl = "http://3.11.101.223:3001/user/auth/authorize";
    var xhr = new XMLHttpRequest();
    xhr.open('POST', authUrl, true);
    xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');
    xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://3.11.101.223:3001/');
    xhr.setRequestHeader('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE, HEAD, OPTIONS");
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.setRequestHeader("Authorization", "Bearer " + token);
    xhr.addEventListener('load', function() {
      var responseObject = JSON.parse(this.response);
      if (responseObject.success == true){
        window.location = redirectToLanding();
      }
    });
  
  xhr.send(null);
  }
}
