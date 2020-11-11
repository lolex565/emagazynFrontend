async function getItems(module) {
    const url = "https://api.emagazyn.gorlice.plpublic/"+module;
    const method = "GET";
    let response = await APIcall(url, method);
    if (response) {
        const tableFields = { id:module+"Id", oldId:module+"OldId", name:module+"Name", status:module+"Status" };
        let temp = "<table id=\"resultTable\"><tr><td><b>ID</b></td><td><b>Stare ID</b></td><td><b>Nazwa</b></td><td><b></b></td></tr>";
        for (i = 0; i < response.length; i++) {
            /* temp += "<tr><td>"+response[i][tableFields.id]+"</td><td>"+response[i][tableFields.oldId]+"</td><td>"+response[i][tableFields.name]+"</td><td>"+response[i][tableFields.status]+"</td></tr>"; */
            temp += "<tr><td>"+response[i][tableFields.id]+"</td><td>";
            temp += response[i][tableFields.oldId] ? response[i][tableFields.oldId]+"</td><td>":"</td><td>";
            temp += response[i][tableFields.name] +"</td><td>";
            temp += response[i][tableFields.status] ? response[i][tableFields.status]+"</td></tr>":"</td></tr>";
        };
        temp += "</table>";
        document.getElementById(module).innerHTML = temp;
    } else {
        document.getElementById(module).innerHTML += "wystąpił jakiś błąd"
    };
};



async function addItem(module) {
    const url = "https://api.emagazyn.gorlice.pl"+module+"/add";
    const method = "POST";
    const formId = module+"Form";
    document.getElementById("result").innerHTML = "";
    let response = await APIcall(url, method, formId);
    if (response.success == true) {
        document.getElementById("result").innerHTML = "<h2>Zapisano <inline style=\"color:red\">"+response.item+"</inline> w bazie danych</h2>";
    } else if (response.error == "access denied") {
        document.getElementById("result").innerHTML = "<h2>Nie masz dostępu</h2>";
    };
};

async function getItem(module, id) {
    const url = "https://api.emagazyn.gorlice.plpublic/"+module+"/"+id;
    const method = "GET";
    let response = await APIcall(url, method);
    return response;
};

async function fillForm(module) {
    document.getElementById("result").innerHTML = "";
    const rawId = String(document.getElementById("editId").value);
    const id = rawId.padStart(5, 0);
    const formFields = { oldId:module+"OldId", name:module+"Name", status:module+"Status" };
    document.getElementById("editId").value= id;
    const data = await getItem(module, id);
    if (!data) {
        document.getElementById("result").innerHTML = "<h2>Nie mogę znaleźć przedmiotu o ID: "+id+"</h2>";
        document.getElementById(formFields.oldId).value = "";
        document.getElementById(formFields.name).value = "";
        document.getElementById(formFields.status).value = "";
    } else {
        document.getElementById(formFields.oldId).value = data[formFields.oldId] ? data[formFields.oldId] : "";
        document.getElementById(formFields.name).value = data[formFields.name] ? data[formFields.name] : "";
        document.getElementById(formFields.status).value = data[formFields.status] ? data[formFields.status] : "";
    };
};

async function editItem(module) {
    const id = document.getElementById("editId").value;
    const url = "https://api.emagazyn.gorlice.pl"+module+"/edit/"+id;
    const method = "PATCH";
    const formId = module+"EditForm";
    document.getElementById("result").innerHTML = "";
    let response = await APIcall(url, method, formId);
    if (response.success == true) {
        document.getElementById("result").innerHTML = "<h2>Zmieniono <inline style=\"color:red\">"+response.item+"</inline> w bazie danych</h2>";
    } else if (response.error == "access denied") {
        document.getElementById("result").innerHTML = "<h2>Nie masz dostępu</h2>";
    }else {
        document.getElementById("result").innerHTML = "<h2>Nie było czego zmieniać</h2>";
    };
};

async function deleteItem(module) {
    document.getElementById("result").innerHTML = "";
    temp = document.getElementById(module+"Name").value;
    const id = document.getElementById("editId").value;
    const url = "https://api.emagazyn.gorlice.pl"+module+"/delete/"+id;
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