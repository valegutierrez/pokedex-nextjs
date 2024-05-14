"use client"

import { itemClient } from "@/app/utils/api";
import Card from "./card";
import { useEffect, useState } from "react";
import { Item } from "pokenode-ts";

interface ItemCardProps {
	itemId: number;
}

export default function ItemCard(props: ItemCardProps) {

	const [loading, setLoading] = useState(false); 
	const [item, setItem] = useState<Item>();
	const { itemId } = props;

	useEffect(() => {
	setLoading(true);
		itemClient.getItemById(itemId)
		.then((data) => {
			setItem(data);
			setLoading(false);
		})
		.catch((error) => console.error(error))
	}, [item, setItem, setLoading]
	)
	return (
		<Card image={item?.sprites.default as string} name={item?.name as string} category={item?.category.name as string} />
	);
}