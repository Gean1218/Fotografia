import { buscaFotos } from "./fotos.js";
import { config } from "./config.js";

const API_KEY = config.googleDrive.apiKey;
const FOLDER_ID = config.googleDrive.folderId;

// Nome da imagem que você quer exibir (ajuste conforme o necessário)
const NOME_IMAGEM = "W_Contatos";

async function carregarImagemDestacada() {
  try {
    const fotos = await buscaFotos(API_KEY, FOLDER_ID);

    const imagem = fotos.find(foto => foto.name === NOME_IMAGEM);

    if (imagem) {
      const container = document.getElementById('imagem-destacada');
      container.innerHTML = `
        <img src="${imagem.url}" alt="${imagem.name}" class="w-full h-full object-cover rounded" />
      `;
    } else {
      console.warn(`Imagem '${NOME_IMAGEM}' não encontrada na pasta do Drive.`);
    }
  } catch (erro) {
    console.error("Erro ao carregar a imagem:", erro);
  }
}

carregarImagemDestacada();
