"use client"
// useEffect solo se ejecuta en el cliente

import { berryClient } from "@/app/utils/api";
// importa funcion desde api.ts
import { NamedAPIResource } from "pokenode-ts";
// NamedAPIResource es el nombre del recurso que se va a solicitar
import { useEffect, useState } from "react";
// importa useEffect para definir estado sin escribir una clase
import BerryCard from "../components/berrycard";
// importa componente berrycard
import Pagination from "@/app/components/pagination";
// importa componente pagination
import { useSearchParams } from "next/navigation";
// importa parametros de busqueda de NextJS

export default function Home() {

	const searchParams = useSearchParams(); // parametros de busqueda para paginador, default vacio
	const [loading, setLoading] = useState(false); // default falso prevenir mensaje de carga
	const [totalPages, setTotalPages] = useState<number>(1); // default 1 porque debe haber al menos una pagina, total de paginas
	const [berryList, setBerryList] = useState<NamedAPIResource[]>([]); // listado que contiene una llave 'name' y una llave 'url'
	const page = searchParams.get('page') ?? '1'; // default 1 porque debe haber al menos una pagina, pagina actual
	const per_page = searchParams.get('per_page') ?? '12' // default a 12 entries, numero total de entries por pagina
	const start = (Number(page) - 1) * Number(per_page); // offset del paginado

	useEffect(() => {
		setLoading(true); // vuelve 'verdadero' la carga
			berryClient.listBerries(start, Number(per_page)) // define offset paginado y cantidad de items a mostrar
			.then((data) => {
				setBerryList(data.results) // entrega una lista de objetos
				setTotalPages(Math.ceil(data.count/Number(per_page))) // divide la cantidad de items por la cantidad de elementos por pagina a mostrar y lo redondea al numero <= a este
				setLoading(false); // desactiva la carga una vez conseguida la data
			})
			.catch((error) => console.error(error)) // maneja cualquier error mientras se ejecuta useEffect
	}, [berryList, setBerryList, setLoading, start, per_page] // previene fetching innecesario, solo se recalcula cuando cambian estas dependencias
	)

  return (
		<main className="min-h-screen p-10 bg-gradient-to-b from-white to-pink-300">
					<Pagination currentPage="berries" hasPrevPage={start > 0} hasNextPage={Number(page) < totalPages} totalPages={totalPages}/>
					{/* instancia de componente pagination */}
			<div className="grid gap-5 max-w-3xl md:grid-cols-4 sm:grid-cols-3 mx-auto">
				{ (loading || !berryList) ? (
					// si loading es verdadero o berryList es undefined
					<p>Loading</p>
				) : ( 
					berryList.map((berry) => <BerryCard berryId={parseInt(berry.url.substring(berry.url.slice(0,-1).lastIndexOf("/") + 1))}/>
					// recorre berryList y entrega por cada uno una instancia de componente 
				))}
			</div>
		</main>
  );
}