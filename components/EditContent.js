import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const EditContent = ({ closeModal, editFormContent, id }) => {
	// const [modalData, setModalData] = useState({
	// 	imageUrl: '',
	// 	title: '',
	// 	author: '',
	// });

	const [modalData, setModalData] = useState(editFormContent);

	const handleChange = (e) => {
		setModalData({ ...modalData, [e.target.name]: e.target.value });
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
				<button className="w-full px-4 py-2 text-base font-semibold text-white bg-palette-primary rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
					Save Changes
				</button>
			</form>
		</div>
	);
};

export default EditContent;
