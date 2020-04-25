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
            console.log(responseObject.result.length);
            temp += "<ul>";
            for (var i = 0; i < responseObject.result.length; i++) {
                console.log("i am in loop")
                temp += "<li><table class=\"storeTable\"><tr><td>ID:</td><td>Stare ID</td><td>Nazwa</td><td>Stan/Uwagi</td></tr><tr><td>";
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
