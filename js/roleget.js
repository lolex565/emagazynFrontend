window.onload = getUserRole();
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
      showMenu();
    });
    xhr.send(null);
  }

function showMenu() {
    var resultElement = document.getElementById('menu');
    switch (localStorage.role) {
        case 'admin':
            resultElement.innerHTML += '<input type=\"button\" value=\"admin panel\"></input>';
            resultElement.innerHTML += '<input type=\"button\" value=\"magazyn\"></input>';
            resultElement.innerHTML += '<input type=\"button\" value=\"archiwum\"></input>';
            resultElement.innerHTML += '<input type=\"button\" value=\"biblioteczka\"></input>';
            break;
        case 'archive':
            resultElement.innerHTML += '<input type=\"button\" value=\"archiwum\"></input>';
            break;
        case 'library':
            resultElement.innerHTML += '<input type=\"button\" value=\"biblioteczka\"></input>';
            break;
        case 'storage':
            resultElement.innerHTML += '<input type=\"button\" value=\"magazyn\"></input>';
            break;
        default:
            break;
    }
}