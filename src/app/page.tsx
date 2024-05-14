"use client"

import { pokemonClient } from "@/app/utils/api";
import { NamedAPIResource } from "pokenode-ts";
import { useEffect, useState } from "react";
import PokemonCard from "./components/pokemoncard";

const generations = [
	{
		generation: 1,
		name: "Gen I",
		genOffset: 0,
		genEnd: 151
	},
	{
		generation: 2,
		name: "Gen II",
		genOffset: 151,
		genEnd: 251
	},
	{
		generation: 3,
		name: "Gen III",
		genOffset: 251,
		genEnd: 386
	},
	{
		generation: 4,
		name: "Gen IV",
		genOffset: 386,
		genEnd: 493
	},
	{
		generation: 5,
		name: "Gen V",
		genOffset: 493,
		genEnd: 649
	},
	{
		generation: 6,
		name: "Gen VI",
		genOffset: 649,
		genEnd: 721
	},
	{
		generation: 7,
		name: "Gen VII",
		genOffset: 721,
		genEnd: 809
	},
	{
		generation: 8,
		name: "Gen VIII",
		genOffset: 809,
		genEnd: 905
	},
	{
		generation: 10,
		name: "Gen IX",
		genOffset: 251,
		genEnd: 386
	},
]

export default function Home() {

	const [loading, setLoading] = useState(false); 
	const [pokemonList, setPokemonList] = useState<NamedAPIResource[]>([]);
	//

	useEffect(() => {
		setLoading(true);
			pokemonClient.listPokemons(generations[0].genOffset, 12)
			.then((data) => {
				setPokemonList(data.results)
				setLoading(false);
			})
			.catch((error) => console.error(error))
	}, [pokemonList, setPokemonList, setLoading]
	)

  return (
    <main className="min-h-screen p-10 bg-gradient-to-b from-white to-pink-300">
			<div className="grid gap-5 max-w-3xl md:grid-cols-4 sm:grid-cols-3 mx-auto">
				{ (loading || !pokemonList) ? (
					<p>Loading</p>
				) : ( 
					pokemonList.map((pokemon) => <PokemonCard pokemonId={parseInt(pokemon.url.substring(pokemon.url.slice(0,-1).lastIndexOf("/") + 1))}/>)
				)}
			</div>
    </main>
  );
}
