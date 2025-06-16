// Importa os módulos do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Suas configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB5D_kl0bgL1XXWQrl5JvcJCP6a5JTndc0",
    authDomain: "fotografa-8f722.firebaseapp.com",
    projectId: "fotografa-8f722",
    storageBucket: "fotografa-8f722.appspot.com",
    messagingSenderId: "548011944901",
    appId: "1:548011944901:web:2a97fbf3f5f41edf08f9ac",
    measurementId: "G-T55QTHJJDY"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const eventsContainer = document.getElementById('events-container');

async function carregarEventos() {
    try {
        const querySnapshot = await getDocs(collection(db, "cards"));
        eventsContainer.innerHTML = '';

        if (querySnapshot.empty) {
            eventsContainer.innerHTML = '<p>Nenhum card encontrado.</p>';
            return;
        }

        querySnapshot.forEach((doc) => {
            const cardData = doc.data();
            const cardId = doc.id;

            // Filtra cards que não têm imagem ou título
            if (cardData.Imagem && cardData.Titulo) {
                
                const cardHtml = `
                    <div class="event-container">
                        <input type="checkbox" id="event-toggle-${cardId}" class="event-toggle">

                        <label for="event-toggle-${cardId}" class="event-preview">
                            <img src="${cardData.Imagem}" alt="Prévia de ${cardData.Titulo}">
                            <h2 class="preview-title">${cardData.Titulo}</h2>
                        </label>

                        <div class="event-card">
                            <div class="modal-content">
                                <label for="event-toggle-${cardId}" class="close-card">×</label>
                                
                                <div class="card-content">
                                    <div class="card-photo-secondary">
                                        <img src="${cardData.Imagem}" alt="Foto secundária de ${cardData.Titulo}">
                                    </div>
                                    <div class="card-text">
                                        <h1>${cardData.Titulo}</h1>
                                        <p class="subtitle">detalhes</p>
                                        <p class="description">${cardData.Descricao}</p>
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
                                    <img src="${cardData.Imagem}" alt="Foto principal de ${cardData.Titulo}">
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                eventsContainer.innerHTML += cardHtml;
            }
        });

    } catch (error) {
        console.error("Erro ao carregar cards:", error);
        eventsContainer.innerHTML = '<p>Ocorreu um erro ao carregar os cards.</p>';
    }
}

carregarEventos();