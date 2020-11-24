(function fetchDB() {
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText)
            var jsonResponse = JSON.parse(xhr.responseText)
            var valueNRIC = jsonResponse[0].NRIC
            var valueMobile = jsonResponse[0].Mobile
            console.log(valueNRIC);
            document.getElementById("inputNRIC").innerHTML = valueNRIC;
            document.getElementById("inputMobile").innerHTML = valueMobile;


        }
    });

    xhr.open("GET", "https://mhadb-b067.restdb.io/rest/qr-manual-entry");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-apikey", "5f97cdc8dd6e32485dfc35d6");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
}())

