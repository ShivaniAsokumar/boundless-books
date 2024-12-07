import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';

const EditContent = ({ closeModal, editFormContent, id }) => {
	const [modalData, setModalData] = useState(editFormContent);
	const [hoveredIndex, setHoveredIndex] = useState(-1); // State to track hovered star index

	const handleChange = (e) => {
		setModalData({ ...modalData, [e.target.name]: e.target.value });
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
		setModalData({
			...modalData,
			rating: newRating === modalData.rating ? null : newRating,
		});
	};

	// Function to render stars based on current rating and hover state
	const renderStars = () => {
		const stars = [];

		for (let i = 0; i < 5; i++) {
			if (
				i <
				(hoveredIndex !== -1 ? hoveredIndex + 1 : modalData.rating || 0)
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

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_DOMAIN}/books`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						id: id,
						imageUrl: modalData.imageUrl,
						bookTitle: modalData.title,
						author: modalData.author,
						rating: modalData.rating,
					}),
				}
			);

			const result = await response.json();
			if (result.success) {
				setModalData({ coverUrl: '', title: '', author: '' }); // Reset form
				closeModal(true);
			} else {
				alert('Error: ' + result.error);
			}
		} catch (error) {
			alert('Error: ' + error.message);
		}
	};

	return (
		<div className="relative w-96  p-2 rounded-lg shadow-lg font-primary bg-palette-lighter">
			<div className="flex items-center justify-between px-4 py-3 rounded-t-lg bg-opacity-40">
				<h3 className="text-xl text-center font-semibold text-palette-primary pt-1">
					Edit Book
				</h3>
				<button
					className="text-palette-primary hover:text-palette-dark focus:outline-none"
					onClick={closeModal}
				>
					<FontAwesomeIcon
						icon={faX}
						className="text-palette-primary text-lg pr-2"
					/>
				</button>
			</div>
			<form onSubmit={handleSubmit} className="pl-4 pr-4 pb-5">
				<input
					type="text"
					name="imageUrl"
					value={modalData.imageUrl}
					onChange={handleChange}
					className="w-full px-4 py-2 mb-4 text-base border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 "
					placeholder="Image URL"
				/>
				<input
					type="text"
					name="title"
					value={modalData.title}
					onChange={handleChange}
					className="w-full px-4 py-2 mb-4 text-base border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
					placeholder="Book Title"
				/>
				<input
					type="text"
					name="author"
					value={modalData.author}
					onChange={handleChange}
					className="w-full px-4 py-2 mb-4 text-base border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
					placeholder="Author"
				/>
				<label
					htmlFor="rating"
					className="block text-lg font-medium text-gray-700 mr-2"
				>
					Rating:
				</label>
				<div className="flex mb-2">{renderStars()}</div>
				<button className="w-full px-4 py-2 text-base font-semibold text-white bg-palette-primary rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
					Save Changes
				</button>
			</form>
		</div>
	);
};

export default EditContent;
