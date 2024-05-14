import { PokemonClient, ItemClient, BerryClient } from 'pokenode-ts';
// importar la clase de PokeAPI usando pokenode-ts
// pokenode es un kit que 'envuelve' llamados de API en funciones faciles de usar

export const pokemonClient = new PokemonClient();
export const itemClient = new ItemClient();
export const berryClient = new BerryClient();

// se crea una instancia solo una vez para despues solo llamar el metodo de la instancia