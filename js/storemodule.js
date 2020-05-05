function getStoreItems() {
    var url = 'http://3.11.101.223:3001/storeItems';
    var resultElement = document.getElementById('store');
    var addItemButton = document.getElementById('addItemButton');
    var xhr = new XMLHttpRequest();
    var tokenElement = localStorage.token;
    var temp = "";
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://3.10.225.17:3001/storeItems');
    xhr.setRequestHeader("Authorization", "Bearer " + tokenElement);
    xhr.onreadystatechange = function (aEvt) {
      if(xhr.readyState == 4){
          if(xhr.status == 200 || xhr.status == 304 || xhr.status == 203){
            if (localStorage.role.includes("admin") || localStorage.role.includes("storage")) {

            }
            var responseObject = JSON.parse(this.response);
            //console.log(responseObject.result.length);
            temp += "<ul>";
            for (var i = 0; i < responseObject.result.length; i++) {
                //console.log("i am in loop")
                temp += "<li><table class=\"storeTable\"><tr><td>ID:</td><td>Stare ID</td><td>Nazwa</td><td>Stan/Uwagi</td>";
                if (localStorage.role.includes("admin") || localStorage.role.includes("storage")) {
                  temp += "<td rowspan=2><input class=\"storeButtons\" type=\"image\" src=\"../img/edit.png\" alt=\"edytuj\" onclick=\"goToStoreEdit("+responseObject.result[i].store_id+")\" /></td><td rowspan=2><input class=\"storeButtons\" onclick=\"deleteItem("+responseObject.result[i].store_id+")\" type=\"image\" src=\"../img/delete.png\" alt=\"usuń\" /></td>"
                  addItemButton.innerHTML = "<input type=\"button\" value=\"dodaj przedmiot\" onclick=\"goToStoreAdd()\" />"
                }
                temp += "</tr><tr><td>";
                temp += responseObject.result[i].store_id;
                temp += "</td><td>";
                temp += responseObject.result[i].oldId;
                temp += "</td><td>";
                temp += responseObject.result[i].name;
                temp += "</td><td>";
                temp += responseObject.result[i].status;
                temp += "</td></tr></table></li>";
              /*console.log(responseObject[i].store_id);
              console.log(responseObject[i].oldId);
              console.log(responseObject[i].name);
              console.log(responseObject[i].status);*/
            }
            temp += "</ul>";
            resultElement.innerHTML = temp;
          }
      }
  };
  xhr.send(null);
}

function goToStoreEdit(id) {
  var editPageUrl = "http://3.11.101.223/earlyDev/pages/storeedit.html?storeId="+id;
  window.location = editPageUrl;
}

function goToStoreAdd() {
  var url = "http://3.11.101.223/earlyDev/pages/storeadd.html";
  window.location = url;
}

function itemEditForm() {
  var temp = getUrlVars();
  var editItemId = temp.storeId;
  document.getElementById('editItemId').innerHTML = editItemId;
  var url = 'http://3.11.101.223:3001/storeItems/storeItem?id='+editItemId;
  var xhr = new XMLHttpRequest();
  var tokenElement = localStorage.token;
  var temp = "";
  xhr.open('GET', url, true);
  xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://3.10.225.17:3001/storeItems/storeItem');
  xhr.setRequestHeader("Authorization", "Bearer " + tokenElement);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xhr.onreadystatechange = function (aEvt) {
    if(xhr.readyState == 4){
        if(xhr.status == 200 || xhr.status == 304 || xhr.status == 203){
          var responseObject = JSON.parse(this.response);
            document.getElementById('editItemOldId').defaultValue = responseObject.oldId;
            document.getElementById('editItemName').defaultValue = responseObject.name;
            document.getElementById('editItemStatus').defaultValue = responseObject.status;
        }
    }
  };
  xhr.send(null);
}

function editItemSend() {

}

function deleteItem(id) {
  if (confirm("Czy na pewno chcesz usunąć:"+id+" ?")){
    var url = 'http://3.11.101.223:3001/storeItems/storeItem?id='+id;
    var xhr = new XMLHttpRequest();
    var tokenElement = localStorage.token;
    xhr.open('DELETE', url, true);
    xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://3.10.225.17:3001/storeItems/storeItem');
    xhr.setRequestHeader("Authorization", "Bearer " + tokenElement);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.onreadystatechange = function (aEvt) {
      if(xhr.readyState == 4){
          if(xhr.status == 200 || xhr.status == 304 || xhr.status == 203){
            location.reload();
          }
      }
    };
    xhr.send(null);
  }
}

function addItemSend() {
  var url = "http://3.11.101.223:3001/storeItems/storeItem";
  var xhr = new XMLHttpRequest();
  var nameElement = document.getElementById('addItemName');
  var statusElement = document.getElementById('addItemStatus');
  var oldIdElement = document.getElementById('addItemOldId');
  var tokenElement = localStorage.token;
  var name = nameElement.value;
  var status = statusElement.value;
  var oldId = oldIdElement.value;

  xhr.open('POST', url, true);
  xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');
  xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://3.11.101.223:3001/storeItems/storeItem');
  xhr.setRequestHeader('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE, HEAD, OPTIONS");
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xhr.setRequestHeader("Authorization", "Bearer " + tokenElement);
  xhr.addEventListener('load', function() {
    var responseObject = JSON.parse(this.response);
    console.log(responseObject);
  });

  var sendObject = JSON.stringify({name: name, status: status, oldId: oldId});
  xhr.send(sendObject);
}