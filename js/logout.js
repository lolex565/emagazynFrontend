function logout() {
    if (confirm("Czy na pewno chcesz się wylogować?")) {
        localStorage.removeItem('token');
        window.location = "http://3.11.101.223/earlyDev/"
    }
}