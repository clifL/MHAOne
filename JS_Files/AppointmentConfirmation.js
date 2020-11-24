document.getElementById("type").innerHTML = sessionStorage.getItem("appointmentType")
document.getElementById("date").innerHTML = sessionStorage.getItem("appointmentDate")
document.getElementById("subType").innerHTML = sessionStorage.getItem("appointmentSubType")
document.getElementById("time").innerHTML = sessionStorage.getItem("appointmentTimeslot")
document.getElementById("message").innerHTML = sessionStorage.getItem("appointmentMessage")



function editForm() {
    if (sessionStorage.getItem("edit") == "true") {
        window.location.href = "AppointmentNew.html";
    }
    if (sessionStorage.getItem("amend") == "true") {
        window.location.href = "AppointmentEdit.html";
    }
}

function submitForm() {
    document.getElementById("submitButton").disabled = true;
    document.getElementById("editButton").disabled = true;
    document.getElementById("noticeMessage").innerHTML = "Submitting...<br>Please Do Not Refresh";
    var timeslot = sessionStorage.getItem("appointmentTimeslot")
    timeslot = timeslot.replace(":", "")
    timeslot = timeslot.replace(" ", "")
    
    if (timeslot.length < 6) {
        timeslot = "0" + timeslot
    }
    //E/g. 0100pm
    timeslot = convert12To24(timeslot)
    appointment = []
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    var appointmentRawDate = sessionStorage.getItem("appointmentDate").split("-");
    var appointmentDate = String(appointmentRawDate[2]) + "-" + String(appointmentRawDate[1]) + "-" + String(appointmentRawDate[0])
    if (sessionStorage.getItem("edit") != "true") {
        fetch('https://mhadb-b067.restdb.io/rest/appointment/' + sessionStorage.getItem("appointmentID"), {
            method: 'put',
            headers: {
                "content-type": "application/json",
                "x-apikey": "5f97cdc8dd6e32485dfc35d6",
                "cache-control": "no-cache",
            },
            body: JSON.stringify({
                "isDeleted": true,
            })

        })
            .then(res => {
                if (res.ok) {
                    sessionStorage.removeItem("selectType");
                    sessionStorage.removeItem("appointmentMain")
                    sessionStorage.setItem("appointmentMain", $('#selectType option:selected').text().toLowerCase())
                }
                else {
                    console.log("Not successful")
                }
            })
            .then(data => {

            })
            .catch(error => console.log("Error"));


    }
    fetch('https://mhadb-b067.restdb.io/rest/appointment', {
        method: 'post',
        headers: {
            "content-type": "application/json",
            "x-apikey": "5f97cdc8dd6e32485dfc35d6",
            "cache-control": "no-cache",
        },
        body: JSON.stringify({
            "nric": "S1234567D", "type": sessionStorage.getItem("appointmentType"), "date": appointmentDate,
            "description": sessionStorage.getItem("appointmentSubType"), "time": timeslot, "isRead": "false", "isNotiDeleted": "false",
            "message": sessionStorage.getItem("appointmentMessage"), "isDeleted": "false", "createdDate": today
        })
    })
        .then(res => {
            if (res.ok) {
                sessionStorage.removeItem("appointmentID")
                window.location.href = "AppointmentMain.html";
            }
            else {
                console.log("Not successful")
            }
        })
        .then(data => {

        })
        .catch(error => console.log("Error"));
}

function convert12To24(hoursText) {
    minutes = hoursText.toString().substring(2, 4);
    hours = hoursText.toString().substring(0, 2);
    var AmOrPm = hoursText.toString().substring(4, 6);
    if (AmOrPm == "PM") {
        if (hours < 12) {
            hours = parseInt(hours) + 12
        }
    }
    var finalTime = hours.toString() + minutes.toString()
    return finalTime
}

