"use client"

import { itemClient } from "@/app/utils/api";
import { NamedAPIResource } from "pokenode-ts";
import { useEffect, useState } from "react";
import ItemCard from "@/app/components/itemcard";
import Pagination from "@/app/components/pagination";
import { useSearchParams } from "next/navigation";

export default function Home({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined}
}) {
	const [loading, setLoading] = useState(false); 
	const [totalPages, setTotalPages] = useState<number>(1);
	const [itemList, setItemList] = useState<NamedAPIResource[]>([]);
	const page = searchParams['page'] ?? '1'; // default to 1
	const per_page = searchParams['per_page'] ?? '12' // default to 12 entries
	const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

	useEffect(() => {
		setLoading(true);
		itemClient.listItems(start, Number(per_page))
			.then((data) => {
				setItemList(data.results)
				setTotalPages(Math.ceil(data.count/Number(per_page)))
				setLoading(false);
			})
			.catch((error) => console.error(error))
		}, [itemList, setItemList, setLoading, start, per_page]
	)

  return (
    <main className="min-h-screen p-10 bg-gradient-to-b from-white to-pink-300">
			<Pagination currentPage="items" hasPrevPage={start > 0} hasNextPage={Number(page) < totalPages} totalPages={totalPages}/>
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