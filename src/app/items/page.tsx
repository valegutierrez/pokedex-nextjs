"use client"

import { itemClient } from "@/app/utils/api";
import { NamedAPIResource } from "pokenode-ts";
import { useEffect, useState } from "react";
import ItemCard from "@/app/components/itemcard";
import Pagination from "@/app/components/pagination";
import { useSearchParams } from "next/navigation";

export default function Home() {

	const searchParams = useSearchParams(); // parametros de busqueda para paginador, default vacio
	const [loading, setLoading] = useState(false); // default falso prevenir mensaje de carga
	const [totalPages, setTotalPages] = useState<number>(1); // default 1 porque debe haber al menos una pagina, total de paginas
	const [itemList, setItemList] = useState<NamedAPIResource[]>([]); // listado que contiene una llave 'name' y una llave 'url'
	const page = searchParams.get('page') ?? '1'; // default 1 porque debe haber al menos una pagina, pagina actual
	const per_page = searchParams.get('per_page') ?? '12' // default a 12 entries, numero total de entries por pagina
	const start = (Number(page) - 1) * Number(per_page); // offset del paginado

	useEffect(() => {
		setLoading(true); // vuelve 'verdadero' la carga
			itemClient.listItems(start, Number(per_page)) // define offset paginado y cantidad de items a mostrar
			.then((data) => {
				setItemList(data.results) // entrega una lista de objetos
				setTotalPages(Math.ceil(data.count/Number(per_page))) // divide la cantidad de items por la cantidad de elementos por pagina a mostrar y lo redondea al numero <= a este
				setLoading(false); // desactiva la carga una vez conseguida la data
				console.log(start)
			})
			.catch((error) => console.error(error)) // maneja cualquier error mientras se ejecuta useEffect
	}, [itemList, setItemList, setLoading, start, per_page] // previene fetching innecesario, solo se recalcula cuando cambian estas dependencias
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