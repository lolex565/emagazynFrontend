async function login() {
    const url = "http://127.0.0.1:5000/auth/login";
    const method = "POST";
    let response = await APIcall(url, method, "login");
    if (response.data.token){
        localStorage.token = response.data.token;
        window.location.href = "./index.html";
    } else {
        switch (response.errorCode) {
            case 1:
                document.getElementById("result").innerHTML = "<h2>Zły email, spróbuj wprowadzić go ponownie</h2>";
                break;
            case 2:
                document.getElementById("result").innerHTML = "<h2>Email nie został zweryfikowany, zweryfikuj go i spróbuj ponownie</h2>";
                break;
            case 3:
                document.getElementById("result").innerHTML = "<h2>Złe hasło, spróbuj wprowadzić je ponownie</h2>";
                break;
            default:
                document.getElementById("result").innerHTML = "<h2>Nieznany Błąd, spróbuj ponownie</h2>";
                break;
        };
    };
};

function loggedIn() {
    if (localStorage.token) {
        document.getElementById("accountManage").innerHTML = "<h2 class=\"splash\"> zarządzaj kontem</h2><input type=\"button\" value=\"Usuń konto\" onclick=\"deleteAccount()\"><input value=\"Wyloguj się\" type=\"button\" onclick=\"logout()\">"
        let decoded = parseJwt(localStorage.token);
        if (decoded.roles.admin) {
            document.getElementById("buttons").innerHTML += "<a href=\"/pages/admin.html\"><input type=\"button\" value=\"Admin\"></a>";
        }
    };
};

async function deleteAccount() {
    if (confirm("Czy napewno chcesz się usunąć konto?")) {
        const deldata = {confirmation:true};
        const method = "DELETE";
        const url = "http://127.0.0.1:5000/user";
        let response = await APIcall(url, method, "", deldata);
        if (response.success){
            alert("usunięto konto");
            localStorage.removeItem("token");
            window.location.href = "./index.html";
        } else {
            alert("wystąpił błąd");
        };
    };
};

function logout() {
    if (confirm("Czy napewno chcesz się wylogować?")) {
        localStorage.removeItem("token");
        alert("wylogowano");
        window.location.href = "./index.html"
    };
};

async function register() {
    const url = "http://127.0.0.1:5000/auth/register";
    const method = "POST";
    let response = await APIcall(url, method, "register");
    if (response.error) {
        document.getElementById("result").innerHTML = "<h2>W trakcie rejestracji wystąpil błąd</h2>"
    } else {
        document.getElementById("result").innerHTML = "<h2>zarejestrowano pomyślnie, sprawdź skrzynkę email i postępuj zgodnie z instrukcjami</h2><br />";
    };
};

async function verify() {
    const verificationToken = document.getElementById("verificationToken").value;
    const method = "GET";
    const url = "http://127.0.0.1:5000/verify/" + verificationToken;
    let response = await APIcall(url, method);
    if (response.success) {
        document.getElementById("result").innerHTML = "<h2>Pomyślnie zweryfikowano konto</h2>"
        wait(5000);
        window.location.href = "./index.html"
    }
}