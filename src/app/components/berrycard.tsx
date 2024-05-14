"use client"

import { berryClient, itemClient } from "@/app/utils/api";
import Card from "./card";
import { useEffect, useState } from "react";
import { Item } from "pokenode-ts";

interface BerryCardProps {
	berryId: number;
}

export default function BerryCard(props: BerryCardProps) {

	const [loading, setLoading] = useState(false); 
	const [itemBerry, setItemBerry] = useState<Item>();
	const { berryId } = props;

	useEffect(() => {
	setLoading(true);
		berryClient.getBerryById(berryId)
		.then((data) => {
			return itemClient.getItemByName(data.item.name)
		}).then((data) => {
			setItemBerry(data);
			setLoading(false);
		})
		.catch((error) => console.error(error))
	}, [itemBerry, setItemBerry, setLoading]
	)
	return (
		<Card image={itemBerry?.sprites.default as string} name={itemBerry?.name as string} category={itemBerry?.category.name as string} />
	);
}