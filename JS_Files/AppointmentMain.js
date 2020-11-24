sessionStorage.removeItem("appointmentType")
sessionStorage.removeItem("appointmentDescription")
sessionStorage.removeItem("appointmentDate")
sessionStorage.removeItem("appointmentTimeslot")
sessionStorage.removeItem("appointmentMessage")
sessionStorage.removeItem("appointmentID")

if (sessionStorage.getItem("appointmentMain") == "vaccination") {
    document.getElementById("selectType").value = "Vaccination";
    sessionStorage.removeItem("appointmentMain")
}
else if (sessionStorage.getItem("appointmentMain") == "consultation") {
    document.getElementById("selectType").value = "Consultation";
    sessionStorage.removeItem("appointmentMain")
}

var appointment = [];
var selectedCategory = "upcoming"

var currentDay = function (sp) {
    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return (yyyy + sp + mm + sp + dd);
};

function fetchAppointment() {
    appointment = []
    fetch('https://mhadb-b067.restdb.io/rest/appointment?q={"isDeleted": false}&h={"$orderby": {"date": 1}}', {
        method: 'GET',
        headers: {
            "content-type": "application/json",
            "x-apikey": "5f97cdc8dd6e32485dfc35d6",
            "cache-control": "no-cache"
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            else {
                console.log("Not successful")
            }
        })
        .then(data => {
            removeAllChildElements("appointmentCards")
            for (i = 0; i < data.length; i++) {
                appointment.push(data[i])
            }
            displayAppointment("upcoming")
        })
        .catch(error => console.log("Error"));
}

function deleteAppointment(id) {
    if (confirm("Do you really want to delete the appointment?")) {
        fetch('https://mhadb-b067.restdb.io/rest/appointment/' + id, {
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
}

function editAppointment(id) {
    sessionStorage.removeItem("appointmentType")
    sessionStorage.removeItem("appointmentSubType")
    sessionStorage.removeItem("appointmentDate")
    sessionStorage.removeItem("appointmentTimeslot")
    sessionStorage.removeItem("appointmentMessage")
    sessionStorage.removeItem("appointmentID")
    sessionStorage.setItem("appointmentID", id)
    for (var i = 0; i < appointment.length; i++) {
        if (appointment[i]._id == id) {
            sessionStorage.setItem("appointmentType", appointment[i].type)
            sessionStorage.setItem("appointmentSubType", appointment[i].description)

            var rawDate = appointment[i].date.split("T");
            rawDate = rawDate[0].split("-");
            rawDate = rawDate[2] + "-" + rawDate[1] + "-" + rawDate[0];
            sessionStorage.setItem("appointmentDate", rawDate)
            sessionStorage.setItem("appointmentTimeslot", convert24To12(appointment[i].time))
            sessionStorage.setItem("appointmentMessage", appointment[i].message)
            break;
        }
    }
    sessionStorage.removeItem("appointmentEdit");
    x = document.getElementById("selectType");
    sessionStorage.setItem("appointmentEdit", x.options[x.selectedIndex].text);
    sessionStorage.setItem("amend", "true")
    window.location.href = "AppointmentEdit.html";
}



function removeAllChildElements(elementID) {
    document.getElementById(elementID).innerHTML = ""
}

function displayAppointment() {
    bottomPadding = "20px"
    appointmentType = $('#selectType option:selected').text().toLowerCase()
    if (appointmentType == "vaccination") {
        var cardContent = "";
        for (var i = 0; i < appointment.length; i++) {
            if (appointment[i].type.toLowerCase() != "vaccination") { continue; }
            var rawDate = appointment[i].date.split("T")[0].split("-");
            var appointmentDate = new Date(rawDate[0], rawDate[1] - 1, rawDate[2]);
            var todayDate = new Date().setHours(0, 0, 0, 0)
            category = selectedCategory
            category = category.toLowerCase();
            if (category == "upcoming") {
                if (appointmentDate < todayDate) {
                    continue;
                }
            }
            if (category == "missed") {
                if (appointmentDate >= todayDate) {
                    continue;
                }
            }
            if ( i == (appointment.length -1) && sessionStorage.getItem("Version") == "1")
            {
                bottomPadding = "40px"
            }
            cardContent += "<div class='card'><div class='card-content'><div class='card-body' style='padding: 20px 20px 0px 20px'><div class='media d-flex'><div class='align-self-center'>" +
                "<span><b>" + appointment[i].description + "</b><br>" + appointmentDate.toDateString() + " <br>" + appointment[i].time + " HRS (" + convert24To12(appointment[i].time) +
                ") </span></div><div class='media-body text-right'><a id ='" + appointment[i]._id + "' href='#' onclick='editAppointment(this.id)'><span>&nbspEdit&nbsp</span></a>" +
                "</div></div></div></div><div class='card-body' style='padding: 0px 20px " + bottomPadding  +" 20px'><div class='media-body text-right'><a id ='" + appointment[i]._id + "' href='#' onclick='deleteAppointment(this.id)'><span>Delete</span></a>" + "</div></div></div>"
        }
    }
    else if (appointmentType == "consultation") {
        var cardContent = "";
        for (var i = 0; i < appointment.length; i++) {
            if (appointment[i].type.toLowerCase() != "consultation") { continue; }
            var rawDate = appointment[i].date.split("T")[0].split("-");
            var appointmentDate = new Date(rawDate[0], rawDate[1] - 1, rawDate[2]);
            var todayDate = new Date().setHours(0, 0, 0, 0)
            category = selectedCategory
            category = category.toLowerCase();
            if (category == "upcoming") {
                if (appointmentDate < todayDate) {
                    continue;
                }
            }
            if (category == "missed") {
                if (appointmentDate >= todayDate) {
                    continue;
                }
            }
            cardContent += "<div class='card'><div class='card-content'><div class='card-body' style='padding: 20px 20px 0px 20px'><div class='media d-flex'><div class='align-self-center'>" +
                "<span><b>" + appointment[i].description + "</b><br>" + appointmentDate.toDateString() + " <br>" + appointment[i].time + " HRS (" + convert24To12(appointment[i].time) +
                ") </span></div><div class='media-body text-right'><a id ='" + appointment[i]._id + "' href='#' onclick='editAppointment(this.id)'><span>&nbspEdit&nbsp</span></a>" +
                "</div></div></div></div><div class='card-body' style='padding: 0px 20px 20px 20px'><div class='media-body text-right'><a id ='" + appointment[i]._id + "' href='#' onclick='deleteAppointment(this.id)'><span>Delete</span></a>" + "</div></div></div>"
        }
    }
    else {
        var cardContent = "";
        for (var i = 0; i < appointment.length; i++) {
            var rawDate = appointment[i].date.split("T")[0].split("-");
            var appointmentDate = new Date(rawDate[0], rawDate[1] - 1, rawDate[2]);
            var todayDate = new Date().setHours(0, 0, 0, 0)
            category = selectedCategory
            category = category.toLowerCase()
            if (category == "upcoming") {
                if (appointmentDate < todayDate) {
                    continue;
                }
            }
            if (category == "missed") {
                if (appointmentDate >= todayDate) {
                    continue;
                }
            }
            cardContent += "<div class='card'><div class='card-content'><div class='card-body' style='padding: 20px 20px 0px 20px'><div class='media d-flex'><div class='align-self-center'>" +
                "<span><b>" + appointment[i].description + "</b><br>" + appointmentDate.toDateString() + " <br>" + appointment[i].time + " HRS (" + convert24To12(appointment[i].time) +
                ") </span></div><div class='media-body text-right'><a href=''><span>&nbspEdit&nbsp</span></a>" +
                "</div></div></div></div><div class='card-body' style='padding: 0px 20px 20px 20px'><div class='media-body text-right'><a href=''><span>Delete</span></a>" + "</div></div></div>"
        }
    }
    document.getElementById("appointmentCards").innerHTML = cardContent
}

function convert24To12(hoursText) {
    minutes = hoursText.toString().substring(2, 4);
    hours = hoursText.toString().substring(0, 2);
    var AmOrPm = hours >= 12 ? 'PM' : 'AM';
    hours = (hours % 12) || 12;
    var finalTime = hours + ":" + minutes + " " + AmOrPm;
    return finalTime
}

function controller(category) {
    selectedCategory = category
    displayAppointment()
}

function browseNewAppointment() {
    sessionStorage.removeItem("appointmentNew");
    x = document.getElementById("selectType").value;
    sessionStorage.setItem("appointmentNew", x);
    sessionStorage.removeItem("appointmentType")
    sessionStorage.removeItem("appointmentSubType")
    sessionStorage.removeItem("appointmentDate")
    sessionStorage.removeItem("appointmentTimeslot")
    sessionStorage.removeItem("appointmentMessage")
    sessionStorage.removeItem("edit");
    window.location.href = "AppointmentNew.html";
}

fetchAppointment()





