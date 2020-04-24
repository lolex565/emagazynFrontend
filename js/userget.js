window.onload = showUserName();

function getUser() {
    var decodedToken = parseJwt(localStorage.token);
    localStorage.setItem('user', decodedToken.username);
  }

  function showUserName() {
    var temp = "Witaj: ";
    var resultElement = document.getElementById('user');
    getUser();
    temp = temp + localStorage.user;
    resultElement.innerHTML = temp;
  }