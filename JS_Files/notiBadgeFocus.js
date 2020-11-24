var storedArray = JSON.parse(sessionStorage.getItem("arrayForReset"));

document.getElementById("notiItems").onload = onLoadForRead();


function onLoadForRead(){
    
    var x;
    for(x = 0; x < storedArray.length; x++){
        updateReadItem(storedArray[x]);
       
        }
    }
    
    function updateReadItem(postID){
    
        
        var data = JSON.stringify({
            "isRead": "true"
          });
          
    
          var xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
    
          var url = "https://mhadb-b067.restdb.io/rest/appointment/";
          var combineURL = url + postID;
          
         xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
              
            }
          });
          
          xhr.open("PUT", combineURL);
          xhr.setRequestHeader("content-type", "application/json");
          xhr.setRequestHeader("x-apikey", "5f97cdc8dd6e32485dfc35d6");
          xhr.setRequestHeader("cache-control", "no-cache");
    
          xhr.send(data);
    
    }