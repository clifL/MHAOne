$('.timepicker').timepicker({
    timeFormat: 'h:mm p',
    interval: 20,
    minTime: '08',
    maxTime: '6:00pm',
    startTime: '08:00',
    dynamic: false,
    dropdown: true,
    scrollbar: true
});


$('#date').datepicker({
    format: 'dd-mm-yyyy',
    uiLibrary: 'bootstrap4',
});

var vacTag = "<span id = 'appointmentType'>Appointment Type (*)</span><select name='ddlSelect' id='subType' class='shadow-sm form-control'>" +
    "<option >Please Select an Option</option><option>Hepatitis A</option>" +
    "<option >Flu (shot only)</option></select>"

var consultTag = "<span id = 'appointmentType'>Appointment Type (*)</span><select name='ddlSelect' id='subType' class='shadow-sm form-control'>" +
    "<option >Please Select an Option</option><option>Health Screening</option>" +
    "<option >Report Sick</option></select>"


if (sessionStorage.getItem("appointmentNew") == "Consultation") {
    document.getElementById("selectType").value = "Consultation";
    onChangedType()

}
else {
    document.getElementById("selectType").value = "Vaccination";
    onChangedType()
}

if (sessionStorage.getItem("amend") == "true") {
    document.getElementById("selectType").value = sessionStorage.getItem("appointmentType")
    onChangedType()
    document.getElementById("subType").value = sessionStorage.getItem("appointmentSubType")
    document.getElementById("date").value = sessionStorage.getItem("appointmentDate")
    console.log(sessionStorage.getItem("appointmentTimeslot"))
    document.getElementById("time").value = sessionStorage.getItem("appointmentTimeslot")
    document.getElementById("message").innerHTML = sessionStorage.getItem("appointmentMessage")
}


function exitForm() {
    var r = confirm("Do you want to exit this page? (Changes will not be saved)")
    if (r == true) {
        sessionStorage.removeItem("date");
        sessionStorage.removeItem("time");
        sessionStorage.removeItem("message");
        window.location.href = "AppointmentMain.html";
    }
}



function submitForm() {
    if ($('#subType option:selected').text() == "Please Select an Option") {
        alert("Please Select an Option");
        return;
    }
    else if (document.getElementById("date").value == "") {
        alert("Please Select a Date");
        return;
    }
    else if (document.getElementById("time").value == "") {
        alert("Please Select a Timeslot");
        return;
    }
    var rawDate = document.getElementById("date").value.split("-");
    var appointmentDate = new Date(rawDate[2], rawDate[1]-1, rawDate[0]);
    var todayDate = new Date().setHours(0, 0, 0, 0)
    if (appointmentDate < todayDate) {
        alert("Please select a future date");
        return;
    }
    if ((document.getElementById("subType").value == sessionStorage.getItem("appointmentSubType")) 
    && (document.getElementById("date").value == sessionStorage.getItem("appointmentDate"))
    && (document.getElementById("time").value == sessionStorage.getItem("appointmentTimeslot"))
    && (document.getElementById("message").value == sessionStorage.getItem("appointmentMessage"))
    && (document.getElementById("selectType").value == sessionStorage.getItem("appointmentType")))  {
        console.log(document.getElementById("message").innerHTML)
        console.log(sessionStorage.getItem("appointmentMessage"))
        alert("No Changes Detected");
        return;
    }

    sessionStorage.removeItem("appointmentType")
    sessionStorage.removeItem("appointmentSubType")
    sessionStorage.removeItem("appointmentDate")
    sessionStorage.removeItem("appointmentTimeslot")
    sessionStorage.removeItem("appointmentMessage")
    sessionStorage.setItem("appointmentType", $('#selectType option:selected').text())
    sessionStorage.setItem("appointmentSubType", $('#subType option:selected').text())
    sessionStorage.setItem("appointmentDate", document.getElementById("date").value)
    sessionStorage.setItem("appointmentTimeslot", document.getElementById("time").value)
    sessionStorage.setItem("appointmentMessage", document.getElementById("message").value)
    sessionStorage.setItem("amend", "true")
    sessionStorage.removeItem("edit")
    window.location.href = "AppointmentConfirmation.html";
    
}












$('.fa-clock-o').click(function () { //your button
    setTimeout(function () { $('.timepicker').focus(); }, 100);

});


function onChangedType() {
    var x = document.getElementById("selectType").value;
    document.getElementById("subTypeDiv").innerHTML = ""
    if (x == "Vaccination") {
        document.getElementById("subTypeDiv").innerHTML = vacTag
    }
    else if (x == "Consultation") {
        document.getElementById("subTypeDiv").innerHTML = consultTag
    }
}




