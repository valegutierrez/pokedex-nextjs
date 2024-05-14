"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { FC } from 'react'

interface PaginationProps {
	currentPage: string,
	hasPrevPage: boolean,
	hasNextPage: boolean,
	totalPages: number,
}

const Pagination: FC<PaginationProps> = (
  {
		currentPage,
    hasPrevPage,
		hasNextPage,
		totalPages,
  }
) => {

	const searchParams = useSearchParams();

	const router = useRouter();
	const page = searchParams.get('page') ?? '1';
	const per_page = searchParams.get('per_page') ?? '12';

	return (
		<div className='flex gap-4 justify-center mb-4'>
			<button
				className='rounded bg-pink-500 text-white p-3'
				disabled={!hasPrevPage}
				onClick={() => {
					router.push(`${currentPage}/?page=${Number(page) - 1}&per_page=${per_page}`)
				}}>
					prev page
			</button>

			<div className="self-center">
				{page} / {totalPages}
			</div>

			<button
				className='rounded bg-pink-500 text-white p-1'
				disabled={!hasNextPage}
				onClick={() => {
					router.push(`${currentPage}/?page=${Number(page) + 1}&per_page=${per_page}`)
				}}>
				next page
			</button>
		</div>
	)
}

export default Pagination;