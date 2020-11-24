var arrayForDeleteAll = [];
var arrayForDeleteAllId = [];

function fetchNotification(userNRIC){

    var data = null;

		var xhr = new XMLHttpRequest();
		xhr.withCredentials = false;

        var url = "https://mhadb-b067.restdb.io/rest/appointment";

        xhr.open("GET", url);
		xhr.setRequestHeader("content-type", "application/json");
		xhr.setRequestHeader("x-apikey", "5f97cdc8dd6e32485dfc35d6");
		xhr.setRequestHeader("cache-control", "no-cache");

        xhr.send();
        
        xhr.addEventListener("readystatechange", function () {
			if (this.readyState === 4) {
                var authenticatedItems = [];
                var jsonResponse = JSON.parse(xhr.responseText);

                var i;
                for(i = 0; i < jsonResponse.length; i ++){
                    if (jsonResponse[i].nric == userNRIC && jsonResponse[i].isDeleted === false && jsonResponse[i].isNotiDeleted === false && jsonResponse[i].isAttended === false){
                        authenticatedItems.push(jsonResponse[i]);
                    }
                }


                var todayDate = new Date();

                var dd = String(todayDate.getDate()).padStart(2, '0');
                var mm = String(todayDate.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = todayDate.getFullYear();

                displayDateForItem = dd + '/' + mm + '/' + yyyy;
                displayDate = mm + '/' + dd + '/' + yyyy;
                
                //change to calculation date format
                var correctDisplayDate = new Date(displayDate);

                // Change to displaying time format
                var hours = todayDate.getHours();
                var minutes = todayDate.getMinutes();

                displayTime = (("0"+hours).slice(-2)) + ':' + (("0"+minutes).slice(-2));


                //Inserting object into Notification page
                var notiListId = document.getElementById('notiItems');

                var x;
                for(x = 0; x < authenticatedItems.length; x ++){
                    var dateBaseDate = authenticatedItems[x].date

                    changeFormatDate = new Date(dateBaseDate);
                    year = changeFormatDate.getFullYear();
                    month = changeFormatDate.getMonth()+1;
                    dt = changeFormatDate.getDate();
    
                    if (dt < 10) {
                    dt = '0' + dt;
                    }
                    if (month < 10) {
                    month = '0' + month;
                    }
    
    
                    var correctFormatDate = month +'/' + dt + '/'+year;
    
                    var testDate = new Date(correctFormatDate);
    
                   // To calculate the time difference of two dates 
                    var Difference_In_Time = testDate.getTime() - correctDisplayDate.getTime(); 
      
                    // To calculate the no. of days between two dates 
                    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

                    var Difference_In_Hours =  Difference_In_Time / (1000 * 3600);

                    var Difference_In_Minutes = Difference_In_Time / (1000 * 60);

                   
                    var min = Math.round(Difference_In_Minutes);

                    
                    if(Difference_In_Days == 1){

                        var deleteNotiID = "deleteNoti" + x;

                        notiListId.insertAdjacentHTML('afterend', 
                       
                        '<div  class="list-group-item list-group-item-action" id="deleteNoti' + x
                        + '">'
                        + '<div class="row">' 
                        + '<div class="col-10">' 
                        + '<p>' + displayDateForItem + " " + displayTime + '</p>'
                        + '</div>' 
                        + '<div class="col-2">' 
                        + '<i class="fa fa-trash-o" onclick="notiDelete(\''+ deleteNotiID +'\',\''+ authenticatedItems[x]._id+'\' )" style="font-size:1.2em;">'
                        + '</i>'
                        + '</div>'
                        + '</div>' 
                        + '<div>' 
                        + '<p>Consultation: ' + authenticatedItems[x].description + '</p>'
                        + '<p>You are 1 days away from your appointment</p>'
                        + '</div>'
                        + '</div>'  
                        );
                        arrayForDeleteAll.push(authenticatedItems[x]._id);
                        arrayForDeleteAllId.push(deleteNotiID);

                          
                    }
                    else if(Difference_In_Days == 3){

                        var deleteNotiID = "deleteNoti" + x;

                        notiListId.insertAdjacentHTML('afterend', 

                        '<div  class="list-group-item list-group-item-action" id="deleteNoti' + x
                        + '">'
                        + '<div class="row">' 
                        + '<div class="col-10">' 
                        + '<p>' + displayDateForItem + " " + displayTime + '</p>'
                        + '</div>' 
                        + '<div class="col-2">' 
                        + '<i class="fa fa-trash-o" onclick="notiDelete(\''+ deleteNotiID +'\',\''+ authenticatedItems[x]._id+'\' )" style="font-size:1.2em;">'
                        + '</i>'
                        + '</div>'
                        + '</div>' 
                        + '<div>' 
                        + '<p>Consultation: ' + authenticatedItems[x].description + '</p>'
                        + '<p>You are 3 days away from your appointment</p>'
                        + '</div>'
                        + '</div>'  
                        );
                        arrayForDeleteAll.push(authenticatedItems[x]._id);
                        arrayForDeleteAllId.push(deleteNotiID);
                     
                    }
                    else if(Difference_In_Days == 7){
 
                        var deleteNotiID = "deleteNoti" + x;

                        notiListId.insertAdjacentHTML('afterend',

                        '<div  class="list-group-item list-group-item-action" id="deleteNoti' + x
                        + '">'
                        + '<div class="row">' 
                        + '<div class="col-10">' 
                        + '<p>' + displayDateForItem + " " + displayTime + '</p>'
                        + '</div>' 
                        + '<div class="col-2">' 
                        + '<i class="fa fa-trash-o" onclick="notiDelete(\''+ deleteNotiID +'\',\''+ authenticatedItems[x]._id +'\' )" style="font-size:1.2em;">'
                        + '</i>'
                        + '</div>'
                        + '</div>' 
                        + '<div>' 
                        + '<p>Consultation: ' + authenticatedItems[x].description + '</p>'
                        + '<p>You are 7 days away from your appointment</p>'
                        + '</div>'
                        + '</div>'  
                        );
                        arrayForDeleteAll.push(authenticatedItems[x]._id);
                        arrayForDeleteAllId.push(deleteNotiID);
                      
                        
                    }
                    else if(testDate.getTime() == correctDisplayDate.getTime()){

                        var deleteNotiID = "deleteNoti" + x;

                        notiListId.insertAdjacentHTML('afterend', 

                        '<div  class="list-group-item list-group-item-action" id="deleteNoti' + x
                        + '">'
                        + '<div class="row">' 
                        + '<div class="col-10">' 
                        + '<p>' + displayDateForItem + " " + displayTime + '</p>'
                        + '</div>' 
                        + '<div class="col-2">' 
                        + '<i class="fa fa-trash-o" onclick="notiDelete(\''+ deleteNotiID +'\',\''+ authenticatedItems[x]._id +'\' )" style="font-size:1.2em;">'
                        + '</i>'
                        + '</div>'
                        + '</div>' 
                        + '<div>' 
                        + '<p>Consultation: ' + authenticatedItems[x].description + '</p>'
                        + '<p>You have a appointment today at ' + authenticatedItems[x].time+ ' </p>'
                        + '<p><b>Please be on time for your appointment</b></p>'
                        + '</div>'
                        + '</div>'  
                        );
                       
                     arrayForDeleteAll.push(authenticatedItems[x]._id);
                     arrayForDeleteAllId.push(deleteNotiID);
                        
                    }
                }

            }
        });
}


fetchNotification("S1234567D");

function updateDeletedItem(postID){

    
    var data = JSON.stringify({
        "isNotiDeleted": "true"
      });
      

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = false;

      var url = "https://mhadb-b067.restdb.io/rest/appointment/";
      var combineURL = url + postID;
      
     xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          console.log(this.responseText);
        }
      });
      
      xhr.open("PUT", combineURL);
      xhr.setRequestHeader("content-type", "application/json");
      xhr.setRequestHeader("x-apikey", "5f97cdc8dd6e32485dfc35d6");
      xhr.setRequestHeader("cache-control", "no-cache");

      xhr.send(data);

    console.log("Help");
    console.log(postID);

}

function updateDeletedAllItem(){
    var x;
    for(x = 0; x < arrayForDeleteAll.length; x++){
        updateDeletedItem(arrayForDeleteAll[x]);
        }

    var a;
    for(a = 0; a < arrayForDeleteAllId.length; a++){
        var deleteAll = document.getElementById(arrayForDeleteAllId[a]).remove();
        }
    

}
