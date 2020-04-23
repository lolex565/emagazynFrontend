    // make the request to the login endpoint
    function getToken() {
      var loginUrl = "http://3.11.101.223:3000/user/auth/login";
      var xhr = new XMLHttpRequest();
      var userElement = document.getElementById('username');
      var passwordElement = document.getElementById('password');
      var user = userElement.value;
      var password = passwordElement.value;
    
      xhr.open('POST', loginUrl, true);
      xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');
      xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://3.11.101.223:3000');
      xhr.setRequestHeader('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE, HEAD, OPTIONS");
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      xhr.addEventListener('load', function() {
        var responseObject = JSON.parse(this.response);
        console.log(responseObject);
        if (responseObject.token) {
          localStorage.setItem('token', responseObject.token);
          redirectToLanding();
        } else {
          localStorage.setItem('token', "No token received");
        }
      });
    
      var sendObject = JSON.stringify({password: password, username: user});
    
      console.log('going to send', sendObject);
    
      xhr.send(sendObject);
    }
  
    // make the request to the secret API endpoint
/*  function getSecret() {
  
      var url = "http://3.11.101.223:3000/";
      var xhr = new XMLHttpRequest();
      var tokenElement = localStorage.getItem('token');
      var resultElement = document.getElementById('result');
      xhr.open('GET', url, true);
      xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://3.10.225.17:3000/');
      xhr.setRequestHeader("Authorization", "Bearer " + tokenElement);
      xhr.addEventListener('load', function() {
        var responseObject = JSON.parse(this.response);
        resultElement.innerHTML = responseObject.message;
      });
    
      xhr.send(null);
    }
*/

  