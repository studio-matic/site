async function loadTable({ url, selector, emptyText, columns }) {
  const tbody = document.querySelector(selector);
  tbody.innerHTML = `<tr><td colspan="3">Caricamento…</td></tr>`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      tbody.innerHTML = `<tr><td colspan="3">Errore nel caricamento dei dati</td></tr>`;
      return;
    }

    const data = await res.json();
    tbody.innerHTML = "";

    if (!data.length) {
      tbody.innerHTML = `<tr><td colspan="3">${emptyText}</td></tr>`;
      return;
    }

    data.forEach((item) => {
      const tr = document.createElement("tr");
      tr.innerHTML = columns(item);
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error(err);
    tbody.innerHTML = `<tr><td colspan="3">Errore nella connessione con il database</td></tr>`;
  }
}

async function loadDbData() {
  const res = await fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const me = await res.json();
  const activeUserRank = me.role_rank;

  await loadTable({
    url: `${baseUrl}/users`,
    selector: "#users tbody",
    emptyText: "Ancora nessun utente...",
    columns: ({ id, email, role, role_rank }) => `
            <td>${email}</td>
            <td>${role}</td>
            <td>
                ${
                  activeUserRank > role_rank
                    ? `<button class="delete-user" data-id="${id}">Cancella</button>`
                    : ""
                }
            </td>
        `,
  });
}

function enableForms() {
  document
    .querySelector("#users tbody")
    .addEventListener("click", async (e) => {
      if (e.target.classList.contains("delete-user")) {
        const id = e.target.dataset.id;
        if (confirm("Sei sicuro di voler cancellare l'utente?")) {
          const res = await fetch(`${baseUrl}/users/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });

          if (res.ok) {
            alert("Utente cancellato");
            loadDbData();
          } else {
            alert(await res.text());
          }
        }
      }
    });
}

async function redirUnauthorized() {
  const res = await fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  const { role } = await res.json();
  if (!res.ok || (role !== "admin" && role !== "superadmin")) {
    alert(`Devi essere un amministratore`);
    const returnUrl = encodeURIComponent(window.location.pathname);
    window.location.href = `${hostingPrefix}/login?next=${returnUrl}`;
  }
}
