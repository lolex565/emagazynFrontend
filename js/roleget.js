function getUserRole() {
    var url = "http://3.11.101.223:3000/admin/roles/role";
    var xhr = new XMLHttpRequest();
    var tokenElement = localStorage.getItem('token');
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://3.10.225.17:3000/admin/users/user');
    xhr.setRequestHeader("Authorization", "Bearer " + tokenElement);
    xhr.addEventListener('load', function() {
      var responseObject = JSON.parse(this.response);
      localStorage.setItem('role', responseObject.permissionType);
    });
    xhr.send(null);
  }

