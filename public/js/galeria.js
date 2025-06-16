import { buscaFotos } from "./fotos.js";
const API_KEY = "AIzaSyAQjtnpM6hmOqBlzCA8UV89qlADczzhNY0";
const FOLDER_ID = "1qylePfLPOwZLO06GjwIwrOqOlUMe3P3H";
let listaFotos=[];

export async function carregarListaFotos() {
  return await buscaFotos(API_KEY, FOLDER_ID);
}
