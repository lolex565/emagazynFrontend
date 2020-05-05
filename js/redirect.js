function redirectToLanding() {
    var url = "http://3.11.101.223:3001/";
    var xhr = new XMLHttpRequest();
    var tokenElement = localStorage.getItem('token');
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://3.10.225.17:3001/');
    xhr.setRequestHeader("Authorization", "Bearer " + tokenElement);
    xhr.addEventListener('load', function() {
      var responseObject = JSON.parse(this.response);
      var authSucces = responseObject.success;
      if (authSucces) {
            window.location = "landing.html"
      }
    });
    
      xhr.send(null);
}

function redirectToAdmin() {
  var url = "http://3.11.101.223/earlyDev/pages/adminpanel.html";
  window.location = url;
}

function redirectToStore() {
  var url = "http://3.11.101.223/earlyDev/pages/store.html";
  window.location = url;
}

function redirectToLibrary() {
  var url = "http://3.11.101.223/earlyDev/pages/library.html";
  window.location = url;
}

function redirectToArchive() {
  var url = "http://3.11.101.223/earlyDev/pages/archive.html";
  window.location = url;
}

function redirectToLogin() {
  var url = "http://3.11.101.223/earlyDev/login.html";
  window.location = url;
}

function redirectToRegister() {
  var url = "http://3.11.101.223/earlyDev/register.html";
  window.location = url;
}
