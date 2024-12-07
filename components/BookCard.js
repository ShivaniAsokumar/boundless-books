import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHeart as faSolidHeart,
	faStar as faSolidStar,
} from '@fortawesome/free-solid-svg-icons';
import {
	faHeart as faRegularHeart,
	faStar as faRegularStar,
} from '@fortawesome/free-regular-svg-icons';

const BookCard = ({ imageUrl, bookTitle, author, bookId, rating }) => {
	const [isFavorite, setIsFavorite] = useState(false);
	const [hoveredIndex, setHoveredIndex] = useState(-1); // State to track hovered star index
	const [updatedRating, setUpdatedRating] = useState(null);

	const { data: session } = useSession();
	const userId = session?.user?.id;

	const router = useRouter();

	const handleStarHover = (index) => {
		setHoveredIndex(index);
	};

	const handleStarLeave = () => {
		setHoveredIndex(-1); // Reset hover state when mouse leaves stars
	};

	const handleStarClick = async (index) => {
		// Set the rating in formData when a star is clicked
		const newRating = index + 1;
		// setUpdatedRating(newRating);

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_DOMAIN}/books`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						id: bookId,
						imageUrl,
						bookTitle,
						author,
						rating: newRating,
					}),
				}
			);

			const result = await response.json();
			if (!result.success) {
				alert('SOmething wrong with PUT');
			}

			window.location.reload();
		} catch (error) {
			alert('Error: ' + error.message);
		}
	};

	// Function to render stars based on current rating and hover state
	const renderStars = () => {
		const stars = [];

		for (let i = 0; i < 5; i++) {
			if (i < (hoveredIndex !== -1 ? hoveredIndex + 1 : rating || 0)) {
				stars.push(
					<FontAwesomeIcon
						key={i}
						icon={faSolidStar}
						className="text-yellow-400 text-lg cursor-pointer"
						onMouseEnter={() => handleStarHover(i)}
						onMouseLeave={handleStarLeave}
						onClick={() => handleStarClick(i)}
					/>
				);
			} else {
				stars.push(
					<FontAwesomeIcon
						key={i}
						icon={faRegularStar}
						className="text-yellow-400 text-lg cursor-pointer"
						onMouseEnter={() => handleStarHover(i)}
						onMouseLeave={handleStarLeave}
						onClick={() => handleStarClick(i)}
					/>
				);
			}
		}

		return stars;
	};

	useEffect(() => {
		const checkFavoriteStatus = async () => {
			try {
				const res = await fetch('/api/favorites/check', {
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
		checkFavoriteStatus();
	}, [bookId, userId]);

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

	// Function to render star icons based on rating
	const renderStarIcons = () => {
		const solidStars = rating; // Number of solid stars based on rating
		const regularStars = 5 - rating; // Remaining regular stars

		const stars = [];
		// Add solid star icons
		for (let i = 0; i < solidStars; i++) {
			stars.push(
				<FontAwesomeIcon
					key={`solid-star-${i}`}
					icon={faSolidStar}
					className="text-yellow-400 text-lg"
				/>
			);
		}

		// Add regular star icons for the remaining
		for (let i = 0; i < regularStars; i++) {
			stars.push(
				<FontAwesomeIcon
					key={`regular-star-${i}`}
					icon={faRegularStar}
					className="text-yellow-400 text-lg"
				/>
			);
		}

		return stars;
	};

	return (
		<>
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
				<div className="float-left pl-4">{renderStars()}</div>
			</div>

			<button onClick={handleFavClick}>
				{isFavorite ? (
					<FontAwesomeIcon
						icon={faSolidHeart}
						className="absolute bottom-0 right-0 mb-4 mr-4 py-2 px-2 text-2xl text-palette-favorite"
					/>
				) : (
					<FontAwesomeIcon
						icon={faRegularHeart}
						className="absolute bottom-0 right-0 mb-4 mr-4 py-2 px-2 text-2xl text-palette-primary hover:text-palette-favorite"
					/>
				)}
			</button>
		</>
	);
};

export default BookCard;
