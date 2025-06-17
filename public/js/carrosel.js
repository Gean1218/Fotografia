// Importa o objeto principal 'config' do arquivo de configuração
import { config } from './config.js';
import { buscaFotos } from "./fotos.js";

// Pega as chaves do Google Drive do objeto de configuração
const API_KEY = config.googleDrive.apiKey;
const FOLDER_ID = config.googleDrive.folderId;

export async function carrosel() {
  const fotos = await buscaFotos(API_KEY, FOLDER_ID);
  console.log("Fotos carregadas para o carrossel:", fotos);

  const Container = document.getElementById("fotos-container");
  if (!Container) {
      console.error('Elemento com id "fotos-container" não encontrado.');
      return;
  }

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
