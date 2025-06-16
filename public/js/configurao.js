
//🔥 Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB5D_kl0bgL1XXWQrl5JvcJCP6a5JTndc0",
  authDomain: "fotografa-8f722.firebaseapp.com",
  projectId: "fotografa-8f722",
  storageBucket: "fotografa-8f722.appspot.com",
  messagingSenderId: "548011944901",
  appId: "1:548011944901:web:2a97fbf3f5f41edf08f9ac",
  measurementId: "G-T55QTHJJDY"
};

// 🔥 Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 🗂️ ID da pasta do Google Drive
const folderId = '1qylePfLPOwZLO06GjwIwrOqOlUMe3P3H';

// 🔑 API Key da API do Google Drive
const apiKey = 'AIzaSyAQjtnpM6hmOqBlzCA8UV89qlADczzhNY0';

// 🔥 Variável para armazenar a imagem selecionada
let imagemSelecionada = null;

// 📦 Função para listar fotos do Google Drive
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

// 🖼️ Função para mostrar as imagens na tela
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

// 🚀 Função para salvar no Firestore (COM A CORREÇÃO)
function salvarCard() {
  const titulo = document.getElementById('inputTitulo').value.trim();
  const descricao = document.getElementById('inputDescricao').value.trim();

  if (!titulo || !descricao || !imagemSelecionada) {
    alert('Preencha todos os campos e selecione uma imagem!');
    return;
  }

  // ===== AQUI ESTÁ A CORREÇÃO =====
  // Agora salvamos os campos com a primeira letra maiúscula para
  // que a página de exibição consiga encontrá-los.
  db.collection('cards').add({
    Titulo: titulo,       // Antes era "titulo"
    Descricao: descricao,   // Antes era "descricao"
    Imagem: imagemSelecionada, // Antes era "imagem"
    criadoEm: firebase.firestore.FieldValue.serverTimestamp()
  })
    .then(() => {
      alert('Card salvo com sucesso!');
      document.getElementById('inputTitulo').value = '';
      document.getElementById('inputDescricao').value = '';
      imagemSelecionada = null;
      document.querySelectorAll('#listaImagens img').forEach(i => i.classList.remove('selecionada'));
      fecharFormulario();
      carregarTabelaCards(); // ✅ atualiza tabela
    })
    .catch(error => {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar. Veja o console.');
    });
}

// 📂 Abrir formulário
function abrirFormulario() {
  document.getElementById('formulario').style.display = 'block';
}

// 📁 Fechar formulário
function fecharFormulario() {
  document.getElementById('formulario').style.display = 'none';
}

// 📋 Função para carregar cards na tabela
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

        // Esta parte do código lê os dados, então ela precisa usar
        // os nomes corretos do banco de dados (agora com letra maiúscula)
        linha.innerHTML = `
          <td>${card.Titulo}</td>
          <td>${card.Descricao}</td>
          <td><img src="${card.Imagem}" alt="Imagem" style="width:80px; height:auto;"></td>
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

// 🗑️ Excluir card
function excluirCard(cardId) {
  if (confirm('Tem certeza que deseja excluir este card?')) {
    db.collection('cards').doc(cardId).delete()
      .then(() => {
        alert('Card excluído com sucesso!');
        carregarTabelaCards();  // ✅ atualiza tabela
      })
      .catch(error => {
        console.error('Erro ao excluir:', error);
        alert('Erro ao excluir. Veja o console.');
      });
  }
}

// 🔥 Inicializa as funções ao carregar
listarFotosDrive();
carregarTabelaCards();
