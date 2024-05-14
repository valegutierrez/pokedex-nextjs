"use client"

import { pokemonClient } from "@/app/utils/api";
import { NamedAPIResource } from "pokenode-ts";
import { useEffect, useState } from "react";
import PokemonCard from "./components/pokemoncard";
import Pagination from "@/app/components/pagination";
import { useSearchParams } from "next/navigation";

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
	
	const searchParams = useSearchParams();
	const [loading, setLoading] = useState(false); 
	const [totalPages, setTotalPages] = useState<number>(1);
	const [pokemonList, setPokemonList] = useState<NamedAPIResource[]>([]);
	const page = searchParams.get('page') ?? '1'; // default to 1
	const per_page = searchParams.get('per_page') ?? '12' // default to 12 entries
	const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);
	//

	useEffect(() => {
		setLoading(true);
			pokemonClient.listPokemons(start, Number(per_page))
			.then((data) => {
				setPokemonList(data.results)
				setTotalPages(Math.ceil(data.count/Number(per_page)))
				setLoading(false);
			})
			.catch((error) => console.error(error))
	}, [pokemonList, setPokemonList, setLoading, start, per_page]
	)

  return (
    <main className="min-h-screen p-10 bg-gradient-to-b from-white to-pink-300">
			<Pagination currentPage="" hasPrevPage={start > 0} hasNextPage={Number(page) < totalPages} totalPages={totalPages}/>
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
