import { config } from './config.js';

// 🔥 Inicializa o Firebase
firebase.initializeApp(config.firebase);
const db = firebase.firestore();

// 🔑 Configuração do Google Drive
const folderId = config.googleDrive.folderId;
const apiKey = config.googleDrive.apiKey;

// 🔥 Variável para armazenar a imagem selecionada
let imagemSelecionada = null;

// 📦 Listar fotos do Google Drive
async function listarFotosDrive() {
  const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}&fields=files(id,name,mimeType)`;

  const resposta = await fetch(url);
  const dados = await resposta.json();

  const fotos = dados.files
    .filter(file => file.mimeType.startsWith('image/'))
    .map(file => ({
      id: file.id,
      nome: file.name,
      url: `https://drive.google.com/thumbnail?id=${file.id}&sz=w400`
    }));

  mostrarImagens(fotos);
}

// 🖼️ Mostrar imagens
function mostrarImagens(imagens) {
  const container = document.getElementById('listaImagens');
  container.innerHTML = '';

  imagens.forEach(img => {
    const imageElement = document.createElement('img');
    imageElement.src = img.url;
    imageElement.alt = img.nome;

    imageElement.addEventListener('click', () => {
      document.querySelectorAll('#listaImagens img').forEach(i => i.classList.remove('selecionada'));
      imageElement.classList.add('selecionada');
      imagemSelecionada = img.url;
    });

    container.appendChild(imageElement);
  });
}

// 🚀 Salvar card
function salvarCard() {
  const titulo = document.getElementById('inputTitulo').value.trim();
  const descricao = document.getElementById('inputDescricao').value.trim();

  if (!titulo || !descricao || !imagemSelecionada) {
    alert('Preencha todos os campos e selecione uma imagem!');
    return;
  }

  db.collection('cards').add({
    titulo: titulo,
    descricao: descricao,
    imagem: imagemSelecionada,
    criadoEm: firebase.firestore.FieldValue.serverTimestamp()
  })
    .then(() => {
      alert('Card salvo com sucesso!');
      document.getElementById('inputTitulo').value = '';
      document.getElementById('inputDescricao').value = '';
      imagemSelecionada = null;
      document.querySelectorAll('#listaImagens img').forEach(i => i.classList.remove('selecionada'));
      fecharFormulario();
      carregarTabelaCards();
    })
    .catch(error => {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar. Veja o console.');
    });
}

// 📂 Abrir e fechar formulário
function abrirFormulario() {
  document.getElementById('formulario').style.display = 'block';
}

function fecharFormulario() {
  document.getElementById('formulario').style.display = 'none';
}

// 📋 Carregar cards
function carregarTabelaCards() {
  const tabela = document.getElementById('tabelaCards');
  tabela.innerHTML = '<tr><td colspan="4">Carregando...</td></tr>';

  db.collection('cards')
    .orderBy('criadoEm', 'desc')
    .get()
    .then(snapshot => {
      tabela.innerHTML = '';

      if (snapshot.empty) {
        tabela.innerHTML = '<tr><td colspan="4">Nenhum card salvo.</td></tr>';
        return;
      }

      snapshot.forEach(doc => {
        const card = doc.data();
        const linha = document.createElement('tr');

        linha.innerHTML = `
          <td>${card.titulo}</td>
          <td>${card.descricao}</td>
          <td><img src="${card.imagem}" alt="Imagem" style="width:80px; height:auto;"></td>
          <td><button onclick="excluirCard('${doc.id}')">Excluir</button></td>
        `;

        tabela.appendChild(linha);
      });
    })
    .catch(error => {
      console.error('Erro ao carregar tabela:', error);
      tabela.innerHTML = '<tr><td colspan="4">Erro ao carregar.</td></tr>';
    });
}

// 🗑️ Excluir
function excluirCard(cardId) {
  if (confirm('Tem certeza que deseja excluir este card?')) {
    db.collection('cards').doc(cardId).delete()
      .then(() => {
        alert('Card excluído com sucesso!');
        carregarTabelaCards();
      })
      .catch(error => {
        console.error('Erro ao excluir:', error);
        alert('Erro ao excluir. Veja o console.');
      });
  }
}

// 🚀 Inicialização
listarFotosDrive();
carregarTabelaCards();
// 🪟 Disponibiliza no escopo global (para funcionar com onclick no HTML)
window.abrirFormulario = abrirFormulario;
window.fecharFormulario = fecharFormulario;
window.salvarCard = salvarCard;
window.excluirCard = excluirCard;
