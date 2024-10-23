const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 8
let offset = 0;

const maxRecords = 151

function loadPokemonItens(offset, limit){ 
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}" data-number="${pokemon.number}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
        
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
        
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
        `).join('')

        // Adiciona novos Pokémons à lista existente
        pokemonList.innerHTML += newHtml;

        // Verificar e adicionar evento de clique para redirecionamento
        document.querySelectorAll('.pokemon').forEach(item => {
            item.addEventListener('click', function() {
                const pokemonNumber = this.getAttribute('data-number');
                window.location.href = `pokemon-detail.html?id=${pokemonNumber}`;
            });
        });
    })
}


// Restringe o número de Pokémons que serão exibidos e retira o botão
loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', ()=>{
    offset += limit

    const qtdRecordsNextPage = offset + limit

    if (qtdRecordsNextPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
    
})

