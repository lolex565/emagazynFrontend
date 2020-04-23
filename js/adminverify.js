window.onload = adminVerify();
function adminVerify() {
    getUserRole();
    var resultElement = document.getElementById('result');
    if (localStorage.role == 'admin') {
        resultElement.innerHTML = "<h2 class=\"splash\"> Divide et impera </h2>"
    } else {
        resultElement.innerHTML = "<h2 class=\"splash\">Nie powinno cię tu być</h2>"
    }
}