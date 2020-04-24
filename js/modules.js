function getStoreItems() {
    var url = 'http://3.11.101.223:3001/storeItems';
    var resultElement = document.getElementById('store');
    var xhr = new XMLHttpRequest();
    var tokenElement = localStorage.token;
    var temp = "";
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://3.10.225.17:3001/storeItems');
    xhr.setRequestHeader("Authorization", "Bearer " + tokenElement);
    xhr.onreadystatechange = function (aEvt) {
      if(xhr.readyState == 4){
          if(xhr.status == 200 || xhr.status == 304 || xhr.status == 203){
            var responseObject = JSON.parse(this.response);
            temp += "<ul>";
            for (var i = 0; i < responseObject.length; i++) {
                temp += "<li><table><tr><td>ID:</td><td>Stare ID</td><td>Nazwa</td><td>Stan/Uwagi</td></tr><tr><td>";
                temp += responseObject[i].id;
                temp += "</td><td>";
                temp += responseObject[i].oldId;
                temp += "</td><td>";
                temp += responseObject[i].name;
                temp += "</td><td>";
                temp += responseObject[i].status;
                temp += "</td></tr></table></li>";
            }
            temp += "</ul>";
            resultElement.innerHTML = temp;
          }
      }
  };
  xhr.send(null);
}
