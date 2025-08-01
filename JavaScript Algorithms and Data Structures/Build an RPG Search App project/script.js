document.getElementById('search-button').addEventListener('click', function() {
    const searchInput = document.getElementById('search-input').value.trim().toLowerCase();

    if (!searchInput) {
        alert("Please enter a Pokémon name or ID");
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokémon not found");
            }
            return response.json();
        })
        .then(data => {
            displayPokemonData(data);
        })
        .catch(error => {
            alert("Pokémon not found");
            clearPokemonData();
        });
});

function displayPokemonData(data) {
    const { name, id, weight, height, stats, types, sprites } = data;

    document.getElementById('pokemon-name').innerText = name.toUpperCase();
    document.getElementById('pokemon-id').innerText = `#${id}`;
    document.getElementById('weight').innerText = `Weight: ${weight}`;
    document.getElementById('height').innerText = `Height: ${height}`;
    document.getElementById('hp').innerText = stats[0].base_stat;
    document.getElementById('attack').innerText = stats[1].base_stat;
    document.getElementById('defense').innerText = stats[2].base_stat;
    document.getElementById('special-attack').innerText = stats[3].base_stat;
    document.getElementById('special-defense').innerText = stats[4].base_stat;
    document.getElementById('speed').innerText = stats[5].base_stat;

    // Clear and set types
    const typesElement = document.getElementById('types');
    typesElement.innerHTML = '';
    types.forEach(typeInfo => {
        const typeElement = document.createElement('div');
        typeElement.innerText = typeInfo.type.name.toUpperCase();
        typesElement.appendChild(typeElement);
    });

    // Add or update sprite image
    let spriteElement = document.getElementById('sprite');
    if (!spriteElement) {
        spriteElement = document.createElement('img');
        spriteElement.id = 'sprite';
        document.body.appendChild(spriteElement);
    }
    spriteElement.src = sprites.front_default;
}

function clearPokemonData() {
    document.getElementById('pokemon-name').innerText = '';
    document.getElementById('pokemon-id').innerText = '';
    document.getElementById('weight').innerText = '';
    document.getElementById('height').innerText = '';
    document.getElementById('hp').innerText = '';
    document.getElementById('attack').innerText = '';
    document.getElementById('defense').innerText = '';
    document.getElementById('special-attack').innerText = '';
    document.getElementById('special-defense').innerText = '';
    document.getElementById('speed').innerText = '';
    document.getElementById('types').innerHTML = '';
    const spriteElement = document.getElementById('sprite');
    if (spriteElement) {
        spriteElement.remove();
    }
}
