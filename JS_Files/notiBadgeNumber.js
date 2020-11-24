var authenticatedItems = [];
var arrayForBadgeReset = [];

function fetchBadgeNumber(userNRIC){
    var data = null;
    var countNotification = 0;

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

            var jsonResponse = JSON.parse(xhr.responseText);

            console.log(jsonResponse);

            var i;
            for(i = 0; i < jsonResponse.length; i ++){
                if (jsonResponse[i].nric == userNRIC && jsonResponse[i].isDeleted === false && jsonResponse[i].isNotiDeleted === false && jsonResponse[i].isRead === false && jsonResponse[i].isAttended === false){
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

                    var Difference_In_Hours = Difference_In_Time / (1000 * 3600);

                    var Difference_In_Minutes = Difference_In_Time / (1000 * 60);
                    

                    if(Difference_In_Days == 1){
                        countNotification++;
                        arrayForBadgeReset.push(authenticatedItems[x]._id);

                    }
                    else if(Difference_In_Days == 3){
                        countNotification++;
                        arrayForBadgeReset.push(authenticatedItems[x]._id);
                    }
                    else if(Difference_In_Days == 7){
                        countNotification++;
                        arrayForBadgeReset.push(authenticatedItems[x]._id);

                    }
                    else if(testDate.getTime() == correctDisplayDate.getTime()){
                        countNotification++;
                        arrayForBadgeReset.push(authenticatedItems[x]._id);

                    }

                }
            
            var noOfBadgeId = document.getElementById('badgeNumber');

            if(countNotification > 0){
                noOfBadgeId.insertAdjacentHTML("beforeend", '<span class="badge" id="badgeID">' + countNotification + '</span>');
            }
            
            window.sessionStorage.setItem("arrayForReset", JSON.stringify(arrayForBadgeReset));
        }
    });
   
}
fetchBadgeNumber("S1234567D");
































// var badgeNumberDisplay = sessionStorage.getItem("noOfBadge");
        
// var noOfBadgeId = document.getElementById('badgeNumber');

// noOfBadgeId.insertAdjacentHTML("beforeend", '<span class="badge" id="badgeID">' + badgeNumberDisplay + '</span>');




// function fetchBadgeNumber(userNRIC){
//     var data = null;
//     var countNotification = 0;

// 	var xhr = new XMLHttpRequest();
// 	xhr.withCredentials = false;

//     var url = "https://mhadb-b067.restdb.io/rest/appointment";


//     xhr.open("GET", url);
// 	xhr.setRequestHeader("content-type", "application/json");
//     xhr.setRequestHeader("x-apikey", "5f97cdc8dd6e32485dfc35d6");
//     xhr.setRequestHeader("cache-control", "no-cache");

//     xhr.send();
    
//     xhr.addEventListener("readystatechange", function () {
//         if (this.readyState === 4) {
//             var authenticatedItems = [];
//             var jsonResponse = JSON.parse(xhr.responseText);

//             var i;
//             for(i = 0; i < jsonResponse.length; i ++){
//                 if (jsonResponse[i].nric == userNRIC && jsonResponse[i].isDeleted === false){
//                     authenticatedItems.push(jsonResponse[i]);
//                 }
//             }

//                 var todayDate = new Date();

//                 var dd = String(todayDate.getDate()).padStart(2, '0');
//                 var mm = String(todayDate.getMonth() + 1).padStart(2, '0'); //January is 0!
//                 var yyyy = todayDate.getFullYear();

//                 displayDateForItem = dd + '/' + mm + '/' + yyyy;
//                 displayDate = mm + '/' + dd + '/' + yyyy;
                
//                 //change to calculation date format
//                 var correctDisplayDate = new Date(displayDate);

//                 // Change to displaying time format
//                 var hours = todayDate.getHours();
//                 var minutes = todayDate.getMinutes();

//                 displayTime = (("0"+hours).slice(-2)) + ':' + (("0"+minutes).slice(-2));

//                 console.log("Displaying current time: " + displayTime);


//                 //Inserting object into Notification page
//                 var notiListId = document.getElementById('notiItems');

//                 var x;
//                 for(x = 0; x < authenticatedItems.length; x ++){
//                     var dateBaseDate = authenticatedItems[x].date

//                     changeFormatDate = new Date(dateBaseDate);
//                     year = changeFormatDate.getFullYear();
//                     month = changeFormatDate.getMonth()+1;
//                     dt = changeFormatDate.getDate();
    
//                     if (dt < 10) {
//                     dt = '0' + dt;
//                     }
//                     if (month < 10) {
//                     month = '0' + month;
//                     }
    
    
//                     var correctFormatDate = month +'/' + dt + '/'+year;
    
//                     var testDate = new Date(correctFormatDate);
    
//                    // To calculate the time difference of two dates 
//                     var Difference_In_Time = testDate.getTime() - correctDisplayDate.getTime(); 
      
//                     // To calculate the no. of days between two dates 
//                     var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                    

//                     if(Difference_In_Days == 1){
//                         countNotification++;

//                     }
//                     else if(Difference_In_Days == 3){
//                         countNotification++;
//                     }
//                     else if(Difference_In_Days == 7){
//                         countNotification++;

//                     }
//                     else if(testDate == correctDisplayDate && authenticatedItems[x].time - displayTime == 15){
//                         countNotification++;
                      

//                     }
//                 }

            

//             var notiListId = document.getElementById('notiItems');
            
//             var noOfBadgeId = document.getElementById('badgeNumber');

//             noOfBadgeId.insertAdjacentHTML("beforeend", '<span class="badge" id="badgeID">' + countNotification + '</span>');

//         }
//     });

// }