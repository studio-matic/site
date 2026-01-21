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

document.addEventListener("DOMContentLoaded", () => {
  const team = document.querySelector(".team");
  if (!team) return;

  let scrollAmount = 0;
  let speed = 4; // velocità iniziale

  const style = getComputedStyle(team);
  const gap = parseInt(style.columnGap || style.gap || 100); // spazio tra membri

  function scrollTeam() {
    scrollAmount += speed;

    const firstMember = team.children[0];
    const memberWidth = firstMember.offsetWidth;

    if (scrollAmount >= memberWidth + gap) {
      scrollAmount -= memberWidth + gap;
      team.appendChild(firstMember);
    }

    team.style.transform = `translateX(-${scrollAmount}px)`;
    requestAnimationFrame(scrollTeam);
  }

  scrollTeam();

  /*
  // input per cambiare velocità
  const speedInput = document.getElementById("speed-input");
  const speedSetBtn = document.getElementById("speed-set-btn");

  speedSetBtn.addEventListener("click", () => {
    const value = parseFloat(speedInput.value);
    if (!isNaN(value) && value >= 0) {
      speed = value;
    }
  });
  */
});
