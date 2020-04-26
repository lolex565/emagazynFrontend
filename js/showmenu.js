window.onload = showMenu();
function showMenu() {
    getUserRole();
    var resultElement = document.getElementById('menu');
    if (localStorage.role.includes("admin")) {
        resultElement.innerHTML += '<input type=\"button\" value=\"admin panel\" onclick=\"redirectToAdmin()\"></input>';
    }
        resultElement.innerHTML += '<input type=\"button\" value=\"magazyn\" onclick=\"redirectToStore()\"></input>';
        resultElement.innerHTML += '<input type=\"button\" value=\"archiwum\" onclick=\"redirectToArchive()\"></input>';
        resultElement.innerHTML += '<input type=\"button\" value=\"biblioteczka\" onclick=\"redirectToLibrary()\"></input>';
}