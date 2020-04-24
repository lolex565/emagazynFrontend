window.onload = showMenu();
function showMenu() {
    getUserRole();
    var resultElement = document.getElementById('menu');
    if (localStorage.role.includes("admin")) {
        resultElement.innerHTML += '<input type=\"button\" value=\"admin panel\" onclick=\"redirectToAdmin()\"></input>';
    }
    if (localStorage.role.includes("storage")) {
        resultElement.innerHTML += '<input type=\"button\" value=\"magazyn\" onclick=\"redirectToStore()\"></input>';
    }
    if (localStorage.role.includes("archive")) {
        resultElement.innerHTML += '<input type=\"button\" value=\"archiwum\" onclick=\"redirectToArchive()\"></input>';
    }
    if (localStorage.role.includes("library")) {
        resultElement.innerHTML += '<input type=\"button\" value=\"biblioteczka\" onclick=\"redirectToLibrary()\"></input>';
    }
}