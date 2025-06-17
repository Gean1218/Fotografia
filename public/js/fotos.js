// fotos.js
// Busca fotos do Google Drive usando a API

import { config } from "./config.js"; // importa direto a configuração

const API_KEY = config.googleDrive.apiKey;
const FOLDER_ID = config.googleDrive.folderId;

export async function buscaFotos() {
  const query = encodeURIComponent(`'${FOLDER_ID}' in parents and mimeType contains 'image/'`);
  const url = `https://www.googleapis.com/drive/v3/files?q=${query}&key=${API_KEY}&fields=files(id,name)`;

  const res = await fetch(url);
  const data = await res.json();

  return data.files.map(file => ({
    id: file.id,
    name: file.name,
    url: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`
  }));
}
