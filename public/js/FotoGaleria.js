import { carregarListaFotos } from "./galeria.js";
const galeriaContainer = document.getElementById("galeria");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const fecharModal = document.getElementById("fecharModal");
async function MontaGaleria(params) {
    const listaFotos = await carregarListaFotos();
    listaFotos.forEach(foto => {
        const img = document.createElement("img")
        img.src = foto.url;
        img.alt = foto.name;
        img.className = "mb-4 w-full rounded-lg shadow cursor-pointer";
        img.addEventListener("click",()=>{
           modalImg.src = foto.url;
            modal.classList.remove("hidden");

        });
        galeriaContainer.appendChild(img);
    
    });
    
}

fecharModal.addEventListener("click",()=>{
 modal.classList.add("hidden");
 modalImg.src = "";
});
modal.addEventListener("click",(e)=>{
    if(e.target === modal){
        modal.classList.add("hidden");
        modalImg.src = "";
    }
})
MontaGaleria();