"use client"

import { berryClient } from "@/app/utils/api";
import { NamedAPIResource } from "pokenode-ts";
import { useEffect, useState } from "react";
import BerryCard from "../components/berrycard";

export default function Home() {

	const [loading, setLoading] = useState(false); 
	const [berryList, setBerryList] = useState<NamedAPIResource[]>([]);
	//

	useEffect(() => {
		setLoading(true);
			berryClient.listBerries(0, 12)
			.then((data) => {
				setBerryList(data.results)
				setLoading(false);
			})
			.catch((error) => console.error(error))
	}, [berryList, setBerryList, setLoading]
	)

  return (
    <main className="min-h-screen p-10 bg-gradient-to-b from-white to-pink-300">
			<div className="grid gap-5 max-w-3xl md:grid-cols-4 sm:grid-cols-3 mx-auto">
				{ (loading || !berryList) ? (
					<p>Loading</p>
				) : ( 
					berryList.map((berry) => <BerryCard berryId={parseInt(berry.url.substring(berry.url.slice(0,-1).lastIndexOf("/") + 1))}/>)
				)}
			</div>
    </main>
  );
}