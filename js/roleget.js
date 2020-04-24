function getUserRole() {
    var tokenJSON = parseJwt(localStorage.token);
    localStorage.setItem('role', tokenJSON.role)
  }

