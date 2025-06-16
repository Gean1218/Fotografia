//fotos js
//Vamos pega a foto do google drive através de Api
//Usando o google drive Api
export async function buscaFotos(API_KEY, FOLDER_ID){
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
