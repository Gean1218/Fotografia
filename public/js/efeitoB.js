document.addEventListener("DOMContentLoaded", () => {
  const botoes = document.querySelectorAll(".botaoMenu");
  const overlay = document.getElementById("overlayCarregando");

  if (!botoes.length || !overlay) return;

  botoes.forEach((botao) => {
    botao.addEventListener("click", (e) => {
      e.preventDefault();

      const spinner = botao.querySelector(".spinner");
      if (spinner) spinner.classList.remove("hidden");

      botao.classList.add("pointer-events-none", "opacity-60");

      // Remove as classes que deixam o overlay invisível e bloqueado
      overlay.classList.remove("opacity-0", "pointer-events-none", "hidden");
      overlay.classList.add("flex");

      // Impede rolagem da página
      document.body.classList.add("overflow-hidden");

      setTimeout(() => {
        window.location.href = botao.href;
      }, 800);
    });
  });
});