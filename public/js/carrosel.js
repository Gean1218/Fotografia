import { buscaFotos } from "./fotos.js";

const API_KEY = "AIzaSyAQjtnpM6hmOqBlzCA8UV89qlADczzhNY0";
const FOLDER_ID = "1qylePfLPOwZLO06GjwIwrOqOlUMe3P3H";

export async function carrosel() {
  const fotos = await buscaFotos(API_KEY, FOLDER_ID);
  console.log("Fotos carregadas:", fotos);

  const Container = document.getElementById("fotos-container");
  const imagens = [...fotos, ...fotos]; // duplicar para rolar infinito

  imagens.forEach(foto => {
    const img = document.createElement("img");
    img.src = foto.url;
    img.alt = foto.name;
    img.className = "w-full h-auto"; // Corrigi também o "W-full"
    Container.appendChild(img);
  });
}

carrosel(); // não esqueça de chamar