  const saida = document.querySelector(".animado");
  function animar(texto ,contador){
    if(contador<texto.length){
      setTimeout(()=>{
        saida.textContent += texto.charAt(contador);
        contador++;
        animar(texto,contador);
      },90)

    }
  }
  animar("FOTOS_WRodrigues",0)


  // Botão de entrada
  const btn = document.getElementById("enterBtn");
  btn.addEventListener("click", () => {
    document.body.classList.add("opacity-0", "transition-opacity", "duration-700");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 90);
  });
