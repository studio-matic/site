function hambourger() {
  var x = document.getElementById("myNavbar");
  var icon = document.querySelector(".hambourger_menu i");

  if (x.className === "navbar") {
    x.className += " responsive";
    // Change icon to 'X'
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");
  } else {
    x.className = "navbar";
    // Change icon back to 'bars'
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
}
