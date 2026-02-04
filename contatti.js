// Seleziona i bottoni metodo
const methodButtons = document.querySelectorAll(".method-btn");
const emailInput = document.querySelector('input[name="email"]');
const phoneInput = document.querySelector('input[name="telefono"]');

if (emailInput && phoneInput && methodButtons.length > 0) {
  // STATO INIZIALE: EMAIL
  phoneInput.classList.add("hidden");

  emailInput.required = true;
  phoneInput.required = false;

  emailInput.disabled = false;
  phoneInput.disabled = true;

  methodButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Rimuovi active da tutti
      methodButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      if (btn.dataset.target === "email") {
        // MOSTRA EMAIL
        emailInput.classList.add("visible");
        emailInput.classList.remove("hidden");

        phoneInput.classList.add("hidden");
        phoneInput.classList.remove("visible");

        // REQUIRED / DISABLED
        emailInput.required = true;
        phoneInput.required = false;

        emailInput.disabled = false;
        phoneInput.disabled = true;
      } else {
        // MOSTRA TELEFONO
        phoneInput.classList.add("visible");
        phoneInput.classList.remove("hidden");

        emailInput.classList.add("hidden");
        emailInput.classList.remove("visible");

        // REQUIRED / DISABLED
        phoneInput.required = true;
        emailInput.required = false;

        phoneInput.disabled = false;
        emailInput.disabled = true;
      }
    });
  });
}