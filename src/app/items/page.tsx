"use client"

import { itemClient } from "@/app/utils/api";
import { NamedAPIResource } from "pokenode-ts";
import { useEffect, useState } from "react";
import ItemCard from "../components/itemcard";

export default function Home() {

	const [loading, setLoading] = useState(false); 
	const [itemList, setItemList] = useState<NamedAPIResource[]>([]);
	//

	useEffect(() => {
		setLoading(true);
			itemClient.listItems(0, 12)
			.then((data) => {
				setItemList(data.results)
				setLoading(false);
			})
			.catch((error) => console.error(error))
	}, [itemList, setItemList, setLoading]
	)

  return (
    <main className="min-h-screen p-10 bg-gradient-to-b from-white to-pink-300">
			<div className="grid gap-5 max-w-3xl md:grid-cols-4 sm:grid-cols-3 mx-auto">
				{ (loading || !itemList) ? (
					<p>Loading</p>
				) : ( 
					itemList.map((item) => <ItemCard itemId={parseInt(item.url.substring(item.url.slice(0,-1).lastIndexOf("/") + 1))}/>)
				)}
			</div>
    </main>
  );
}