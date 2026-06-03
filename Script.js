// Base de dados simulada de shows no Brasil
const showsData = [
    // HISTÓRICO (2010 - 2025)
    { artista: "Paul McCartney", local: "Estádio do Morumbi, São Paulo", data: "21/11/2010", categoria: "historico" },
    { artista: "Amy Winehouse", local: "Summer Soul Festival, São Paulo", data: "15/01/2011", categoria: "historico" },
    { artista: "Rock in Rio 2011 (Coldplay, Rihanna)", local: "Cidade do Rock, Rio de Janeiro", data: "Setembro/2011", categoria: "historico" },
    { artista: "Lady Gaga", local: "Parque dos Atletas, Rio de Janeiro", data: "09/11/2012", categoria: "historico" },
    { artista: "Beyoncé", local: "Arena Castelão, Fortaleza", data: "08/09/2013", categoria: "historico" },
    { artista: "One Direction", local: "Parque dos Atletas, Rio de Janeiro", data: "08/05/2014", categoria: "historico" },
    { artista: "Katy Perry", local: "Allianz Parque, São Paulo", data: "25/09/2015", categoria: "historico" },
    { artista: "The Rolling Stones", local: "Estádio do Maracanã, Rio de Janeiro", data: "20/02/2016", categoria: "historico" },
    { artista: "Justin Bieber", local: "Praça da Apoteose, Rio de Janeiro", data: "29/03/2017", categoria: "historico" },
    { artista: "Roger Waters", local: "Estádio do Couto Pereira, Curitiba", data: "27/10/2018", categoria: "historico" },
    { artista: "Iron Maiden", local: "Rock in Rio, Rio de Janeiro", data: "04/10/2019", categoria: "historico" },
    { artista: "Metallica", local: "Estádio do Mineirão, Belo Horizonte", data: "12/05/2022", categoria: "historico" },
    { artista: "Taylor Swift (The Eras Tour)", local: "Allianz Parque, São Paulo", data: "Novembro/2023", categoria: "historico" },
    { artista: "Madonna (The Celebration Tour)", local: "Praia de Copacabana, Rio de Janeiro", data: "04/05/2024", categoria: "historico" },
    { artista: "Linkin Park", local: "Allianz Parque, São Paulo", data: "15/11/2024", categoria: "historico" },
    { artista: "The Weeknd", local: "Estádio MorumBIS, São Paulo", data: "07/09/2024", categoria: "historico" },
    { artista: "Oasis (Live '25)", local: "Estádio MorumBIS, São Paulo", data: "Novembro/2025", categoria: "historico" },

    // ESTE ANO (2026)
    { artista: "Shakira (Las Mujeres Ya No Lloran Tour)", local: "Estádio do MorumBIS, São Paulo", data: "13/02/2026", categoria: "atual" },
    { artista: "Shakira (Las Mujeres Ya No Lloran Tour)", local: "Estádio do Engenhão, Rio de Janeiro", data: "17/02/2026", categoria: "atual" },
    { artista: "Lollapalooza Brasil 2026 (Olivia Rodrigo, Justin Timberlake)", local: "Autódromo de Interlagos, São Paulo", data: "Março/2026", categoria: "atual" },
    { artista: "Rammstein", local: "Allianz Parque, São Paulo", data: "Maio/2026", categoria: "atual" },
    { artista: "Rock in Rio 2026 (Edição Especial)", local: "Cidade do Rock, Rio de Janeiro", data: "Setembro/2026", categoria: "atual" },
    { artista: "Kylie Minogue (Tension Tour)", local: "Ginásio do Ibirapuera, São Paulo", data: "Agosto/2026", categoria: "atual" },

    // ANOS FUTUROS (2027+)
    { artista: "Beyoncé (Renaissance/Cowboy Carter World Tour)", local: "Principais Capitais (Rumor)", data: "Previsão 2027", categoria: "futuro" },
    { artista: "Billie Eilish", local: "Arenas no Brasil", data: "Previsão 2027", categoria: "futuro" },
    { artista: "The Rolling Stones (Turnê de Despedida)", local: "Estádio do Maracanã, Rio de Janeiro", data: "Previsão 2028", categoria: "futuro" }
];

// Elementos do DOM
const container = document.getElementById('shows-container');
const searchInput = document.getElementById('search-input');
const filterButtons = document.querySelectorAll('.filter-btn');
const noResults = document.getElementById('no-results');

let filtroAtual = 'all';
let termoBusca = '';

// Função para renderizar os cards na tela
function renderShows() {
    container.innerHTML = '';
    
    // Filtrar a lista com base no botão e na barra de pesquisa
    const showsFiltrados = showsData.filter(show => {
        const correspondeFiltro = filtroAtual === 'all' || show.categoria === filtroAtual;
        
        const correspondeBusca = show.artista.toLowerCase().includes(termoBusca) || 
                                 show.local.toLowerCase().includes(termoBusca) || 
                                 show.data.toLowerCase().includes(termoBusca);
        
        return correspondeFiltro && correspondeBusca;
    });

    // Exibir mensagem se nada for encontrado
    if (showsFiltrados.length === 0) {
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
    }

    // Criar os elementos HTML de cada card
    showsFiltrados.forEach(show => {
        const card = document.createElement('div');
        card.classList.add('show-card');

        let labelCategoria = "";
        if(show.categoria === 'historico') labelCategoria = "Histórico";
        if(show.categoria === 'atual') labelCategoria = "2026";
        if(show.categoria === 'futuro') labelCategoria = "Futuro";

        card.innerHTML = `
            <div class="card-body">
                <span class="tag-periodo tag-${show.categoria}">${labelCategoria}</span>
                <h3>${show.artista}</h3>
                <p>📍 ${show.local}</p>
                <p class="data">📅 ${show.data}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// Evento de Digitação na barra de busca
searchInput.addEventListener('input', (e) => {
    termoBusca = e.target.value.toLowerCase();
    renderShows();
});

// Evento de Clique nos botões de filtro
filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Remove classe ativa de todos e adiciona no clicado
        filterButtons.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        filtroAtual = e.target.getAttribute('data-filter');
        renderShows();
    });
});

// Inicializar o site exibindo todos os shows
renderShows();
