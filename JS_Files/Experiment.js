var version = 0 //0 - Top Menu Show, Bottom Menu Hide, 1 - Top Menu Hide, Bottom Menu Show

function ToggleVersion() {
    sessionStorage.removeItem("Version")
    var topMenu = document.getElementById("topNavigationBar");
    var bottomMenu = document.getElementById("bottomNavigationBar");
    if (version == 0) {
        sessionStorage.setItem("Version", "0")
        topMenu.style.display = "";
        bottomMenu.style.display = "none";
    } else {
        sessionStorage.setItem("Version", "1")
        topMenu.style.display = "none";
        bottomMenu.style.display = "";
    }
  }

ToggleVersion()