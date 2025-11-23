let cardContainer = document.querySelector('.card-container');
let dados = [];

function normalizarString(str) {
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

async function carregarDados() {
    try {
        let resposta = await fetch("data.json");
        const dadosJson = await resposta.json();
        dados = dadosJson[0].cards; // Correção aqui
        renderizarCards(dados); // Renderiza todos os cards inicialmente
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
    }
}

async function iniciarBusca() {
    if (dados.length === 0) {
        await carregarDados(); 
    }

    let termoBusca = normalizarString(document.getElementById('campo-busca').value);

    let dadosFiltrados = dados.filter(dado => 
        normalizarString(dado.nome).includes(termoBusca) ||
        normalizarString(dado.descricao).includes(termoBusca)
    );

    renderizarCards(dadosFiltrados);
}

function renderizarCards(dadosParaRenderizar) {
    cardContainer.innerHTML = ''; 
    for (let dado of dadosParaRenderizar) {
        let article = document.createElement("article");
        article.classList.add("card");
        
        let cardHTML = `
        <h2>${dado.nome}</h2>
        <p>${dado.descricao}</p>
        <a href="${dado.link}" target="_blank">Saiba mais</a>
        `;

        if (dado.picture) {
            cardHTML += `<img src="${dado.picture}" alt="${dado.nome}" class="right">`;
        }
        
        article.innerHTML = cardHTML;
        cardContainer.appendChild(article);
    }
}

// Carrega os dados quando a página é carregada
carregarDados();
