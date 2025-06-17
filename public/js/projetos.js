// Importa o objeto principal 'config' do arquivo de configuração
import { config } from './config.js';

// Importa os módulos do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Inicializa o Firebase usando a configuração
const app = initializeApp(config.firebase);
const db = getFirestore(app);

const eventsContainer = document.getElementById('events-container');

async function carregarEventos() {
    if (!eventsContainer) {
        console.warn("Elemento #events-container não encontrado.");
        return;
    }

    try {
        console.log("📡 Buscando documentos no Firestore...");
        const querySnapshot = await getDocs(collection(db, "cards"));
        eventsContainer.innerHTML = '';

        if (querySnapshot.empty) {
            eventsContainer.innerHTML = '<p>Nenhum card encontrado.</p>';
            return;
        }

        console.log("✅ Total de cards encontrados:", querySnapshot.size);

        querySnapshot.forEach((doc) => {
            const cardData = doc.data();
            const cardId = doc.id;

            const titulo = cardData.titulo || 'Sem título';
            const descricao = cardData.descricao || 'Sem descrição disponível';
            const imagem = cardData.imagem || '';

            if (imagem && titulo) {
                const cardHtml = `
                    <div class="event-container">
                        <input type="checkbox" id="event-toggle-${cardId}" class="event-toggle">

                        <label for="event-toggle-${cardId}" class="event-preview">
                            <img src="${imagem}" alt="Prévia de ${titulo}">
                            <h2 class="preview-title">${titulo}</h2>
                        </label>

                        <div class="event-card">
                            <div class="modal-content">
                                <label for="event-toggle-${cardId}" class="close-card">×</label>
                                
                                <div class="card-content">
                                    <div class="card-photo-secondary">
                                        <img src="${imagem}" alt="Foto secundária de ${titulo}">
                                    </div>
                                    <div class="card-text">
                                        <h1>${titulo}</h1>
                                        <p class="subtitle">Detalhes</p>
                                        <p class="description">${descricao}</p>
                                    </div>

                                    <div class="card-contact">
                                        <h4 class="contact-title">Entre em contato</h4>
                                        <a href="https://www.instagram.com/fotografias_wenaly/" target="_blank" class="contact-link instagram">
                                            Instagram
                                        </a>
                                        <a href="https://wa.me/553171018341" target="_blank" class="contact-link whatsapp">
                                            WhatsApp
                                        </a>
                                    </div>
                                </div>

                                <div class="card-photo-main">
                                    <img src="${imagem}" alt="Foto principal de ${titulo}">
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                eventsContainer.innerHTML += cardHtml;
            }
        });

    } catch (error) {
        console.error("❌ Erro ao carregar cards:", error);
        eventsContainer.innerHTML = '<p>Ocorreu um erro ao carregar os cards.</p>';
    }
}

// Executa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', carregarEventos);
console.log("🔥 Firebase carregado, iniciando leitura dos cards...");
