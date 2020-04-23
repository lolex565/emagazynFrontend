window.onload = showMenu();
function showMenu() {
    getUserRole();
    var resultElement = document.getElementById('menu');
    switch (localStorage.role) {
        case 'admin':
            resultElement.innerHTML += '<input type=\"button\" value=\"admin panel\" onclick=\"redirectToAdmin()\"></input>';
            resultElement.innerHTML += '<input type=\"button\" value=\"magazyn\" onclick=\"redirectToStore()\"></input>';
            resultElement.innerHTML += '<input type=\"button\" value=\"archiwum\" onclick=\"redirectToArchive()\"></input>';
            resultElement.innerHTML += '<input type=\"button\" value=\"biblioteczka\" onclick=\"redirectToLibrary()\"></input>';
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
            resultElement.innerHTML = "<h2> coś poszło nie tak 😅</h2>"
            break;
    }
}