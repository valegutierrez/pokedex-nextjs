"use client"

interface CardProps {
	image: string,
	name: string,
	tags?: string[],
	category?: string,
}

export default function Card(props: CardProps) {
	return (
		<div className="card bg-white w-50 rounded shadow-lg grid">
			<img className="h-40 p-6 m-auto" src={props.image} alt="A pokemon, a berry or an item" />
			<div className="text-center">
				<div className="capitalize font-bold text-md mb-2">{props.name}</div>
			</div>
			<div className="px-6 py-2">
				{ 
				(props.tags) ? (
					props.tags?.map((tag) => <span className="inline-block bg-pink-500 rounded-full px-3 py-1 text-xs font-medium text-white mr-1 mb-2">{tag}</span>)
				) : (
					<span className="bg-pink-500 rounded-full px-3 py-1 text-xs font-medium text-white mr-1 mb-2">{props.category}</span>
				)
				}
			</div>
		</div>
	)
}