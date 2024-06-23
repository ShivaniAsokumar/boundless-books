'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';

const AddBookPage = () => {
	const [formData, setFormData] = useState({
		coverUrl: '',
		title: '',
		author: '',
		rating: null, // Initialize rating as null or with a default value
	});

	const [hoveredIndex, setHoveredIndex] = useState(-1); // State to track hovered star index

	const router = useRouter();

	const handleChange = (e) => {
		e.stopPropagation();
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleStarHover = (index) => {
		setHoveredIndex(index);
	};

	const handleStarLeave = () => {
		setHoveredIndex(-1); // Reset hover state when mouse leaves stars
	};

	const handleStarClick = (index) => {
		// Set the rating in formData when a star is clicked
		const newRating = index + 1;
		setFormData({
			...formData,
			rating: newRating === formData.rating ? null : newRating,
		});
	};

	// Function to render stars based on current rating and hover state
	const renderStars = () => {
		const stars = [];

		for (let i = 0; i < 5; i++) {
			if (
				i <
				(hoveredIndex !== -1 ? hoveredIndex + 1 : formData.rating || 0)
			) {
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

	const handleSubmit = async (e) => {
		e.preventDefault();

		// TODO: Add error handling for when rating is not provided
		if (formData.rating === null) {
			alert('Rating is required.');
			return; // Exit the function if rating is not provided
		}

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_DOMAIN}/books`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						imageUrl: formData.coverUrl,
						bookTitle: formData.title,
						author: formData.author,
						rating: formData.rating, // Include rating in the request body
					}),
				}
			);

			const result = await response.json();

			if (result.success) {
				setFormData({
					coverUrl: '',
					title: '',
					author: '',
					rating: null,
				}); // Reset form including rating
				router.push('/books'); // Redirect to /books page
			} else {
				alert('Error result not success: ' + result.error);
			}
		} catch (error) {
			alert('Error: ' + error.message);
		}
	};

	return (
		<>
			<div className="min-h-screen flex items-start justify-center bg-white py-8 mt-6 font-primary">
				<div className="bg-palette-lighter p-8 rounded shadow-lg w-full max-w-md">
					<h2 className="text-2xl font-bold mb-6 text-center text-palette-primary">
						Add a New Book
					</h2>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label
								htmlFor="coverUrl"
								className="text-lg block font-medium text-gray-700"
							>
								Book Cover Image URL
							</label>
							<input
								type="text"
								id="coverUrl"
								name="coverUrl"
								value={formData.coverUrl}
								onChange={handleChange}
								className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
								placeholder="https://example.com/book-cover.jpg"
								required
							/>
						</div>
						<div>
							<label
								htmlFor="title"
								className="block text-lg font-medium text-gray-700"
							>
								Book Title
							</label>
							<input
								type="text"
								id="title"
								name="title"
								value={formData.title}
								onChange={handleChange}
								className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
								placeholder="Book Title"
								required
							/>
						</div>
						<div>
							<label
								htmlFor="author"
								className="block text-lg font-medium text-gray-700"
							>
								Author Name
							</label>
							<input
								type="text"
								id="author"
								name="author"
								value={formData.author}
								onChange={handleChange}
								className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
								placeholder="Author Name"
								required
							/>
						</div>
						<div className="flex items-center">
							<label
								htmlFor="rating"
								className="block text-lg font-medium text-gray-700 mr-2"
							>
								Rating:
							</label>
							<div className="flex mb-2">{renderStars()}</div>
						</div>
						<div className="text-center">
							<button
								type="submit"
								className="w-full pb-1 pt-2 px-4 mt-4 border border-transparent rounded-md shadow-lg text-lg font-medium text-white bg-palette-primary hover:bg-palette-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-palette-light"
							>
								Add Book
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default AddBookPage;
