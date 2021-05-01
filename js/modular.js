let dictionary = {
    "public": "publiczny",
    "storeId": "ID",
    "storeOldId": "stary numer identyfikacyjny",
    "storeName": "nazwa",
    "storeStatus": "opis/uwagi",
    "storeLocation": "miejsce składowania",
    "storeValue": "wartość jednostkowa",
    "storeAmount": "ilość",
    "addedBy": "dodano przez",
    "lastEditedBy": "ostatnio edytowano przez",
    "libraryId": "ID",
    "libraryOldId": "stary numer identyfikacyjny",
    "libraryName": "tytuł",
    "libraryStatus": "opis/uwagi",
    "libraryGenre": "gatunek",
    "libraryTarget": "przeznaczenie",
    "libraryBorrowed": "wypożyczona",
    "libraryBorrower": "osoba pożyczająca",
    "libraryLocation": "miejsce przechowywania",
    "ISBN": "ISBN",
    "archiveId": "ID",
    "archiveOldId": "stary numer identyfikacyjny",
    "archiveName": "nazwa",
    "yearOfCreation": "rok powstania",
    "archiveStatus": "opis/uwagi",
    "createdAt": "data utworzenia",
    "updatedAt": "data ostatniej edycji",
    "name": "imie i nazwisko",
    "email": "email",
    "date": "data rejestracji",
    "roles": "uprawnienia",
    "verified": "potwierdzona rejestracja",
    "store": "magazynier",
    "library": "bibliotekarz",
    "archive": "archiwista",
    "admin": "administrator"
};

async function getItems(module) {
    let url = "https://api.emagazyn.gorlice.pl/";
    if (localStorage.token) {
        url = url+module+"/get";
    } else {
        url = url+"public/"+module;
    }
    
    const method = "GET";
    let response = await APIcall(url, method);
    if (response) {
<<<<<<< HEAD
        let keys = Object.keys(response[0]);
        let temp = "<table id=\"resultTable\"><tr>";
        console.log(dictionary)
        keys.forEach(key => {
            temp += "<td>"+dictionary[key]+"</td>"
        });
        temp+="</tr>";
=======
        const tableFields = { id:module+"Id", oldId:module+"OldId", name:module+"Name", status:module+"Status" };
        let temp = "<table id=\"resultTable\"><tr><td><b>ID</b></td><td><b>Stare ID</b></td><td><b>Nazwa</b></td><td><b>Status</b></td></tr>";
>>>>>>> 1ab687b62ef7fa4487ec195b97e594cd397367b8
        for (i = 0; i < response.length; i++) {
            temp+="<tr>";
            keys.forEach(key => {
                temp+= "<td>"+response[i][key]+"</td>"
            });
            temp+="</tr>";
        };
        temp+="</table>"
        document.getElementById(module).innerHTML = temp;
    } else {
        document.getElementById(module).innerHTML += "wystąpił jakiś błąd"
    };
};



async function addItem(module) {
    const url = "https://api.emagazyn.gorlice.pl/"+module+"/add";
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
    let url = "https://api.emagazyn.gorlice.pl/";
    if (localStorage.token) {
        url = url+module+"/get/"+id;
    } else {
        url = url+"public/"+module+"/"+id;
    }
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
    if (!data[0]) {
        document.getElementById("result").innerHTML = "<h2>Nie mogę znaleźć przedmiotu o ID: "+id+"</h2>";
    } else {
        elements = document.querySelectorAll("#"+module+"EditForm input");
        console.log(elements)
        elements.forEach(element => {
            if (element.type=="radio") {
                if (data[0]["public"] == true) {
                    if(element.value == "true") {
                        element.checked = true
                    }
                } else {
                    if(element.value == "false") {
                        element.checked = true
                    }
                }
            } else {
                let name = element.id;
                if (data[0][name] != undefined) {
                    element.value = data[0][name]
                }
            }
        });
    };
};

async function editItem(module) {
    const id = document.getElementById("editId").value;
    const url = "https://api.emagazyn.gorlice.pl/"+module+"/edit/"+id;
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
    const url = "https://api.emagazyn.gorlice.pl/"+module+"/delete/"+id;
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
