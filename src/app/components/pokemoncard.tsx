"use client"

import { pokemonClient } from "@/app/utils/api";
import Card from "./card";
import { useEffect, useState } from "react";
import { Pokemon } from "pokenode-ts";


interface PokemonCardProps {
    pokemonId: number;
}

export default function PokemonCard(props: PokemonCardProps) {

    const [loading, setLoading] = useState(false); 
    const [pokemon, setPokemon] = useState<Pokemon>();
    const { pokemonId } = props;

    useEffect(() => {
		setLoading(true);
			pokemonClient.getPokemonById(pokemonId)
			.then((data) => {
				setPokemon(data);
				setLoading(false);
			})
			.catch((error) => console.error(error))
	}, [pokemon, setPokemon, setLoading]
	)

    return (
        <Card image={pokemon?.sprites.front_default as string} name={pokemon?.name as string} tags={pokemon?.types.map((type) => type.type.name)}/>
    )
}