// Seleziona i bottoni metodo
const methodButtons = document.querySelectorAll('.method-btn');
const emailInput = document.querySelector('input[name="email"]');
const phoneInput = document.querySelector('input[name="telefono"]');

// All'avvio: nascondi entrambi i campi
emailInput.classList.add('hidden');
phoneInput.classList.add('hidden');

methodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Rimuovi active da tutti
        methodButtons.forEach(b => b.classList.remove('active'));
        // Aggiungi active a quello cliccato
        btn.classList.add('active');

        // Mostra campo corrispondente con animazione
        if (btn.dataset.target === 'email') {
            emailInput.classList.add('visible');
            emailInput.classList.remove('hidden');

            phoneInput.classList.add('hidden');
            phoneInput.classList.remove('visible');
        } else {
            phoneInput.classList.add('visible');
            phoneInput.classList.remove('hidden');

            emailInput.classList.add('hidden');
            emailInput.classList.remove('visible');
        }
    });
});
