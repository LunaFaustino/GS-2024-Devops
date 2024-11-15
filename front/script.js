const apiBaseUrl = 'http://4.201.156.53:5000/clientes';

async function fetchClients() {
    const response = await fetch(apiBaseUrl);
    const clients = await response.json();

    const tableBody = document.querySelector('#table-clients tbody');
    tableBody.innerHTML = '';

    clients.forEach(client => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${client.id}</td>
            <td>${client.nome}</td>
            <td>${client.cpf}</td>
            <td>${client.email}</td>
            <td>${client.tel}</td>
            <td>${client.energia}</td>
            <td>${client.metros}</td>
            <td>
                <button onclick="deleteClient(${client.id})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

document.getElementById('form-create').addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        email: document.getElementById('email').value,
        tel: document.getElementById('tel').value,
        energia: document.getElementById('energia').value,
        metros: parseFloat(document.getElementById('metros').value),
    };
    

    const response = await fetch(apiBaseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        alert('Cliente cadastrado com sucesso!');
        fetchClients();
    } else {
        alert('Erro ao cadastrar cliente.');
    }
});


async function deleteClient(id) {
    const response = await fetch(`${apiBaseUrl}/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        alert('Cliente excluído com sucesso!');
        fetchClients();
    } else {
        alert('Erro ao excluir cliente.');
    }
}

fetchClients();
