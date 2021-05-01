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
        if (elements[i].type == "radio") {
            if (elements[i].checked){
                temp += "\"" + elements[i].id + "\":\"" + elements[i].value + "\" ";
                if ((i + 2) < elements.length) temp += ", ";
            }
            
        } else {
            temp += "\"" + elements[i].id + "\":\"" + elements[i].value + "\" ";
            if ((i + 1) < elements.length) temp += ", ";
        }
    }
    temp += "}"
    let parsed = JSON.parse(temp);
    return parsed;
};

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};