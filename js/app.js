console.log("JS carregado com sucesso");

document.addEventListener("DOMContentLoaded", () => {

  const modal = document.getElementById("modal");

  if (!modal) {
    alert("Modal não encontrado no HTML");
    return;
  }

  const leituraInput = document.getElementById("leitura");
  const form = document.getElementById("form");
  const msg = document.getElementById("msg");

  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const whatsapp = document.getElementById("whatsapp");
  const mensagem = document.getElementById("mensagem");

  // BOTÃO AGENDAR
  const botoes = document.querySelectorAll(".btn-agendar");

  if (botoes.length === 0) {
    alert("Nenhum botão encontrado");
  }

  botoes.forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".card");
      leituraInput.value = card.dataset.leitura;
      modal.classList.remove("hidden");
    });
  });

  // FECHAR MODAL CLICANDO FORA
  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  // ENVIAR FORMULÁRIO
  form.addEventListener("submit", e => {
    e.preventDefault();

    if (!nome.value || !email.value || !whatsapp.value || !mensagem.value) {
      msg.innerText = "⚠️ Preencha todos os campos";
      return;
    }

    const pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]");

    pedidos.push({
      nome: nome.value,
      email: email.value,
      whatsapp: whatsapp.value,
      leitura: leituraInput.value,
      mensagem: mensagem.value,
      data: new Date().toLocaleString(),
      status: "Pendente"
    });

    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    msg.innerText = "✨ Pedido enviado com sucesso! ✨";

    form.reset();

    setTimeout(() => {
      modal.classList.add("hidden");
      msg.innerText = "";
    }, 2500);
  });

});
