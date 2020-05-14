const pokedex = document.getElementById('pokedex');
import { AppCacher } from "../../index.js";

const app = new AppCacher('my-pokemon-cache');
app.create();

async function fetchPokemon() {
    const random = Math.floor((Math.random() * 3) + 1);
    const url = `https://pokeapi.co/api/v2/pokemon/${random}`;
    const req = new Request(url);
    const cachedResponse = await app.get(req);
    if (cachedResponse) {
        cachedResponse.json().then((result) => displayPokemon(result));
    } else {
        app.add(req);
        fetch(req).then((res) => res.json().then((result) => {
            displayPokemon(result);
        }));
    }
};

const displayPokemon = (result) => {
    const pokemon = {
        name: result.name,
        image: result.sprites['front_default'],
        id: result.id,
        type: result.types.map(type => type.type.name).join(", "),
    };
    const pokemonHTMLString = `
        <li class="card">
            <img class="card-image" src="${pokemon.image}"/>
            <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
            <p class="card-subtitle">Type: ${pokemon.type}</p>
        </li>
    `
    pokedex.innerHTML = pokemonHTMLString;
};

function deleteCache() {
    app.remove();
}

function emptySelectedreq(url) {
    const req = new Request(url);
    app.delete(req);
}
document.getElementById ("fetchPokemon").addEventListener ("click", fetchPokemon, false);
document.getElementById ("emptySelectedreq").addEventListener ("click", emptySelectedreq.bind(event, 'https://pokeapi.co/api/v2/pokemon/1'), false);
document.getElementById ("deleteCache").addEventListener ("click", deleteCache, false);

// fetchPokemon();
