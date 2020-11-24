function browseVaccination() {
    sessionStorage.removeItem("appointmentMain")
    sessionStorage.setItem("appointmentMain", "vaccination")
    window.location.href = "AppointmentMain.html";
}


function browseConsultation() {
    sessionStorage.removeItem("appointmentMain")
    sessionStorage.setItem("appointmentMain", "consultation")
    window.location.href = "AppointmentMain.html";
}