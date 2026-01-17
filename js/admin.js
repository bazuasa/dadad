function render() {
  const lista = document.getElementById('lista');
  lista.innerHTML = '';

  const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');

  pedidos.forEach((p, i) => {
    lista.innerHTML += `
      <tr>
        <td>${p.nome}</td>
        <td>${p.whatsapp}</td>
        <td>${p.leitura}</td>
        <td>${p.mensagem}</td>
        <td>${p.data}</td>
        <td>${p.status}</td>
        <td>
          <button onclick="responder(${i})">Respondido</button>
          <button onclick="excluir(${i})">Excluir</button>
        </td>
      </tr>
    `;
  });
}

function responder(i) {
  const pedidos = JSON.parse(localStorage.getItem('pedidos'));
  pedidos[i].status = 'Respondido';
  localStorage.setItem('pedidos', JSON.stringify(pedidos));
  render();
}

function excluir(i) {
  const pedidos = JSON.parse(localStorage.getItem('pedidos'));
  pedidos.splice(i, 1);
  localStorage.setItem('pedidos', JSON.stringify(pedidos));
  render();
}

function exportar() {
  const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
  const blob = new Blob([JSON.stringify(pedidos, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'pedidos.json';
  a.click();
}

render();
