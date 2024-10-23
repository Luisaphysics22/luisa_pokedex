function getPokemonIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('id');
  
    // Verificar se o ID foi encontrado
    if (!pokemonId) {
      console.error('ID do Pokémon não encontrado na URL');
      return null;
    }
  
    // Converter o ID para um número (opcional, se necessário)
    return parseInt(pokemonId);
  }
  
// Função para buscar os detalhes do Pokémon da PokeAPI
function fetchPokemonDetails(pokemonId) {
    console.log('Fetching details for Pokémon ID:', pokemonId)
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    
    fetch(url)
        .then(response => response.json())
        .then(pokemon => {
            // Preencher os dados no HTML
            document.getElementById('pokemon-name').innerText = pokemon.name
            document.getElementById('pokemon-height').innerText = `Height: ${pokemon.height / 10} m` // Converter para metros
            document.getElementById('pokemon-weight').innerText = `Weight: ${pokemon.weight / 10} kg` // Converter para kg
            document.getElementById('pokemon-image').src = pokemon.sprites.other.dream_world.front_default

            // Preencher as habilidades
            const abilitiesList = document.getElementById('pokemon-abilities')
            abilitiesList.innerHTML = ''
            pokemon.abilities.forEach(ability => {
                const abilityItem = document.createElement('li')
                abilityItem.innerText = ability.ability.name
                abilitiesList.appendChild(abilityItem)
            })
        })
        .catch(error => {
            console.error('Error fetching Pokémon details:', error)
            document.getElementById('pokemon-name').innerText = 'Pokémon not found'
        })
}

// Quando a página carregar, buscar o ID e exibir os detalhes
document.addEventListener('DOMContentLoaded', () => {
    const pokemonId = getPokemonIdFromUrl()
    if (pokemonId) {
        fetchPokemonDetails(pokemonId)
    } else {
        document.getElementById('pokemon-name').innerText = 'No Pokémon selected'
    }
})
