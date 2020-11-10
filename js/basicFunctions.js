async function APIcall(URL, METHOD, FORMID, DELDATA) {
    if (METHOD == "GET") {
        const params = {
            headers: {
                "AUTH-TOKEN": localStorage.token,
            }
        };
        const response = await fetch(URL, params)
        const data = response.json();
        return data;
    } else if(METHOD =="DELETE") {
        const params = {
            headers: {
                "AUTH-TOKEN": localStorage.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(DELDATA),
            method: METHOD
        };
        const response = await fetch(URL, params);
        const data = response.json();
        return data;
    } else {
        const params = {
            headers: {
                "AUTH-TOKEN": localStorage.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(parseForm(FORMID)),
            method: METHOD
        };
        const response = await fetch(URL, params);
        const data = response.json();
        return data;
    };
};


function parseForm(formId) {
    const elements = document.querySelectorAll('#' + formId + ' input');
    let temp = "{";
    for (var i = 0; i < elements.length; i++) {
        temp += "\"" + elements[i].id + "\":\"" + elements[i].value + "\"";
        if ((i + 1) < elements.length) temp += ", ";
    }
    temp += "}"
    let parsed = JSON.parse(temp);
    return parsed;
};