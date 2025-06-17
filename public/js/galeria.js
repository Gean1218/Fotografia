import { buscaFotos } from "./fotos.js";
import { config } from "./config.js"; // importa a config

let listaFotos = [];

export async function carregarListaFotos() {
  const API_KEY = config.googleDrive.apiKey;
  const FOLDER_ID = config.googleDrive.folderId;

  listaFotos = await buscaFotos(API_KEY, FOLDER_ID);
  return listaFotos;
}
