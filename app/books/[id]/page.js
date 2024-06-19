'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import BookCard from '@/components/BookCard';
import { useParams } from 'next/navigation';
import { fetchBook } from '@/utils/request';
import Image from 'next/image';

const SingleBookPage = () => {
	const { id } = useParams();

	const [book, setBook] = useState(null);

	useEffect(() => {
		const fetchBookData = async () => {
			if (!id) return;
			try {
				const book = await fetchBook(id);
				setBook(book);
			} catch (error) {
				console.error('Error fetching book: ', error);
			}
		};

		if (book === null) {
			fetchBookData();
		}
	}, [id, book]);

	return (
		<div>
			{book && (
				<div className="py-12 gap-x-7 mx-auto flex flex-row flex-wrap justify-left ml-72">
					<a className="h-100 w-80 m-4 rounded shadow-lg  border border-palette-lighter transform duration-500 ease-in-out hover:scale-110">
						<div className="h-[32rem] w-80 border-b-2 pb-6 border-palette-lighter relative">
							<Image
								src={book.imageUrl}
								alt={book.bookTitle}
								layout="fill"
							/>
						</div>
						<div className="h-48 relative">
							<div className="font-primary text-palette-primary leading-none text-2xl pt-4 px-4 font-semibold">
								{book.bookTitle}
							</div>
							<div className="text-lg text-gray-600 p-4 font-primary font-light">
								by {book.author}
							</div>
							<div
								className="text-palette-primary font-primary font-medium text-base absolute bottom-0 right-0 mb-4 pl-8 pr-4 pb-1 pt-2 bg-palette-lighter 
            rounded-tl-sm triangle"
							>
								<span className="text-lg">Fav</span>
							</div>
						</div>
					</a>
				</div>
			)}
		</div>
	);
};

export default SingleBookPage;
