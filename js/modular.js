async function getItems(module) {
    const url = "http://127.0.0.1:5000/public/"+module;
    const method = "GET";
    let response = await APIcall(url, method);
    if (response) {
        for (i = 0; i < response.length; i++) {
            document.getElementById(module).innerHTML += response[i].storeId +" "+ response[i].storeName+"<br/>";
        };
    } else {
        document.getElementById(module).innerHTML += "wystąpił jakiś błąd"
    };
};



async function addItem(module) {
    const url = "http://127.0.0.1:5000/"+module+"/add";
    const method = "POST";
    const formId = module+"Form";
    document.getElementById("result").innerHTML = "";
    let response = await APIcall(url, method, formId);
    if (response.success == true) {
        document.getElementById("result").innerHTML = "<h2>Zapisano <inline style=\"color:red\">"+response.item+"</inline> w bazie danych</h2>";
    };
};

async function getItem(module, id) {
    const url = "http://127.0.0.1:5000/public/"+module+"/"+id;
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
    const url = "http://127.0.0.1:5000/"+module+"/edit/"+id;
    const method = "PATCH";
    const formId = module+"EditForm";
    document.getElementById("result").innerHTML = "";
    let response = await APIcall(url, method, formId);
    if (response.success == true) {
        document.getElementById("result").innerHTML = "<h2>Zmieniono <inline style=\"color:red\">"+response.item+"</inline> w bazie danych</h2>";
    };
};

async function deleteItem(module) {
    document.getElementById("result").innerHTML = "";
    temp = document.getElementById(module+"Name").value;
    const id = document.getElementById("editId").value;
    const url = "http://127.0.0.1:5000/"+module+"/delete/"+id;
    const method = "DELETE";
    let data = "{\"confirmation\":" + (confirm("czy na pewno usunąć") ? true:false) + "}";
    let parsed = JSON.parse(data);
    let response = await APIcall(url,method,"", parsed);
    document.getElementById("result").innerHTML = response.success ? "<h2>Pomyślnie usunięto <inline style=\"color:red\">"+temp+"</inline></h2>":"<h2>Nie usunięto <inline style=\"color:red\">"+temp+"</inline></h2>"
};