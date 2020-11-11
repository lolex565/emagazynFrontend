async function getUsers() {
    const url = "https://api.emagazyn.gorlice.pl/admin";
    const method = "GET";
    let response = await APIcall(url, method);
    if (response) {
        let temp = "<table id=\"resultTable\"><tr><td><b>Imię i Nazwisko</b></td><td><b>Email</b></td><td><b>Admin</b></td><td><b>Magazyn</b></td><td><b>Biblioteka</b></td><td><b>Archiwum</b></td></tr>";
        for (i = 0; i < response.length; i++) {
            temp += "<tr><td>"+response[i].name+"</td><td>";
            temp += response[i].email+"</td><td>";
            temp += response[i].roles.admin ? "✔</td><td>":"❌</td><td>"
            temp += response[i].roles.store ? "✔</td><td>":"❌</td><td>"
            temp += response[i].roles.library ? "✔</td><td>":"❌</td><td>"
            temp += response[i].roles.archive ? "✔</td></tr>":"❌</td></tr>"
        };
        temp += "</table>";
        document.getElementById("admin").innerHTML = temp;
    } else {
        document.getElementById("admin").innerHTML += "wystąpił jakiś błąd"
    };
};

async function getUser(email) {
    const url = "https://api.emagazyn.gorlice.pl/admin/"+email;
    const method = "GET";
    let response = await APIcall(url, method);
    return response;
};

async function fillForm() {
    document.getElementById("result").innerHTML = "";
    let email = document.getElementById("editEmail").value;
    const data = await getUser(email);
    if (!data) {
        document.getElementById("result").innerHTML = "<h2>Nie mogę użytkownika: "+email+"</h2>";
        document.getElementById("adt").checked = false;
        document.getElementById("adf").checked = false;
        document.getElementById("stt").checked = false;
        document.getElementById("stf").checked = false;
        document.getElementById("lit").checked = false;
        document.getElementById("lif").checked = false;
        document.getElementById("art").checked = false;
        document.getElementById("arf").checked = false;
    } else {
        data.roles.admin ? document.getElementById("adt").checked = true:document.getElementById("adf").checked = true;
        data.roles.store ? document.getElementById("stt").checked = true:document.getElementById("stf").checked = true;
        data.roles.library ? document.getElementById("lit").checked = true:document.getElementById("lif").checked = true;
        data.roles.archive ? document.getElementById("art").checked = true:document.getElementById("arf").checked = true;
    };
};

async function parseRolesForm() {
    const admin = document.getElementById("adt").checked ? true:false;
    const store = document.getElementById("stt").checked ? true:false;
    const library = document.getElementById("lit").checked ? true:false;
    const archive = document.getElementById("art").checked ? true:false;
    let data = {roles: {admin:admin, store:store, library:library, archive:archive}};
    return data;
}

async function editUser() {
    const email = document.getElementById("editEmail").value;
    const url = "https://api.emagazyn.gorlice.pl/admin/edit/"+email;
    const method = "PATCH";
    document.getElementById("result").innerHTML = "";
    const data = await parseRolesForm();
    const params = {
        headers: {
            "AUTH-TOKEN": localStorage.token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        method: method
    };
    let response = await fetch(url, params);
    if (response.success == true) {
        document.getElementById("result").innerHTML = "<h2>Zmieniono <inline style=\"color:red\">"+response.name+"</inline> w bazie danych</h2>";
    } else if (response.error == "access denied") {
        document.getElementById("result").innerHTML = "<h2>Nie masz dostępu</h2>";
    }else {
        document.getElementById("result").innerHTML = "<h2>Nie było czego zmieniać</h2>";
    };
};

async function deleteUser() {
    document.getElementById("result").innerHTML = "";
    temp = document.getElementById("editEmail").value;
    const email = document.getElementById("editEmail").value;
    const url = "https://api.emagazyn.gorlice.pl/admin/delete/"+email;
    const method = "DELETE";
    let data = "{\"confirmation\":" + (confirm("czy na pewno usunąć") ? true:false) + "}";
    let parsed = JSON.parse(data);
    let response = await APIcall(url,method,"", parsed);
    if (response.error == "access denied") {
        document.getElementById("result").innerHTML = "<h2>Nie masz dostępu</h2>";
    } else {
        document.getElementById("result").innerHTML = response.success ? "<h2>Pomyślnie usunięto <inline style=\"color:red\">"+temp+"</inline></h2>":"<h2>Nie usunięto <inline style=\"color:red\">"+temp+"</inline></h2>";
    };
};
