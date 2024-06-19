import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const BookCard = ({ imageUrl, bookTitle, author, bookId }) => {
	const [isFavorite, setIsFavorite] = useState(false);

	const { data: session } = useSession();
	const userId = session?.user?.id;

	const handleFavClick = async () => {
		if (!userId) {
			alert('You need to signing to add to Favorites');
			return;
		}

		try {
			const res = await fetch('/api/favorites', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					bookId: bookId,
				}),
			});

			if (res.status === 200) {
				const data = await res.json();
				setIsFavorite(data.isFavorite);
			}
		} catch (error) {
			console.log(error);
			alert('Something went wrong with favorite');
		}
	};

	return (
		<>
			<Link href={`/books/${bookId}`}>
				<div className="h-72 border-b-2 pb-6 border-palette-lighter relative">
					<Image src={imageUrl} alt={bookTitle} layout="fill" />
				</div>
				<div className="h-48 relative">
					<div className="font-primary text-palette-primary leading-none text-2xl pt-4 px-4 font-semibold">
						{bookTitle}
					</div>
					<div className="text-lg text-gray-600 p-4 font-primary font-light">
						by {author}
					</div>
				</div>
			</Link>

			<button
				onClick={handleFavClick}
				className={
					isFavorite
						? 'text-palette-primary font-primary font-medium text-base absolute bottom-0 right-0 mb-4 pl-8 pr-4 pb-1 pt-2 bg-palette-primary rounded-tl-sm triangle opacity-80'
						: 'text-palette-primary font-primary font-medium text-base absolute bottom-0 right-0 mb-4 pl-8 pr-4 pb-1 pt-2 bg-palette-lighter rounded-tl-sm triangle'
				}
			>
				<span className="text-lg">Fav</span>
			</button>
		</>
	);
};

export default BookCard;
