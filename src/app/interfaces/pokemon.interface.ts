export interface Pokemon {
    name: string;
    url: string;
}

export interface PokemonCard {
    id: number;
    name: string;
    img: string;
}

export interface PokemonDetails {
    id: number;
    name: string;
    sprites: {
        front_default: string;
    }
    types: PokemonTypes[];
}

export interface PokemonDetailsFull {
    count: number;
    next: string;
    previous: string;
    results: Pokemon[];
}

export interface PokemonEvoData extends Pokemon{
    id: string;
    imgURL: string
}

export interface PokemonTypes {
    type: {
        name: string;
    }
}

export interface PokemonSpeciesData {
    species: Pokemon;
}

interface PokemonEvolvesTo {
    evolves_to: PokemonSpeciesData[];
    species: Pokemon;
}

export interface PokemonEvolutionInfo {
    chain: {
        evolves_to: PokemonEvolvesTo[]
        species: Pokemon
    }
}

export interface PokemonEvolutionChain {
    evolution_chain: {url: string};
    flavor_text_entries: PokemonDescription[];
}

export interface PokemonDescription {
    flavor_text: string;
    language: { name: string };
    version: { name: string }
}

