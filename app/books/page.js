'use client';
import React, { useEffect, useState } from 'react';
import BookCard from '@/components/BookCard';
import Link from 'next/link';
import { fetchBooks } from '@/utils/request';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { deleteBook } from '@/utils/request';
import EditContent from '@/components/EditContent';
import { useSession } from 'next-auth/react';

const BookListing = () => {
	const [books, setBooks] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [idOfBookToEdit, setIdOfBookToEdit] = useState(null);
	const [editFormContent, setEditFormContent] = useState({
		imageUrl: '',
		title: '',
		author: '',
		rating: null,
	});

	const { data: session } = useSession();
	const userName = session?.user?.name;

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchBooks();
			setBooks(data);
		};
		fetchData();
	}, []);

	const handleDelete = async (id) => {
		const deleteResponse = await deleteBook(id);
		const res = await deleteResponse.json();

		console.log(res);
		if (res.success) {
			setBooks(books.filter((book) => book._id !== id));
		} else {
			console.error('Failed to delete book');
		}
	};

	const openModal = (id, imageUrl, title, author, rating) => {
		setEditFormContent({
			imageUrl,
			title,
			author,
			rating,
		});
		setIsModalOpen(true);
		setIdOfBookToEdit(id);
	};

	const closeModal = async () => {
		setIsModalOpen(false);
		const data = await fetchBooks();
		setBooks(data);
	};

	return (
		<div>
			{userName && (
				<h1 className="max-w-7xl mx-auto px-4 pt-12 text-center md:text-5xl font-bold text-gray-900">
					Welcome {userName.split(' ')[0]}!
				</h1>
			)}

			<div className="py-12 gap-x-7 mx-auto flex flex-row flex-wrap justify-center">
				{books.map((book) => (
					<div
						className="h-100 w-56 m-4 rounded shadow-lg  border border-palette-lighter transform duration-300 ease-in-out hover:scale-110"
						key={book._id}
					>
						<BookCard
							imageUrl={book.imageUrl}
							bookTitle={book.bookTitle}
							author={book.author}
							bookId={book._id}
							rating={book.rating}
						/>

						<button
							className="absolute bottom-0 left-0 mb-4 ml-4 py-2 px-2 text-palette-favorite"
							onClick={() => handleDelete(book._id)}
						>
							<FontAwesomeIcon
								icon={faTrash}
								className="text-palette-primary "
							/>
						</button>
						<button
							className="absolute bottom-0 left-7 mb-4 ml-4 py-2 px-2 text-palette-primary"
							onClick={() =>
								openModal(
									book._id,
									book.imageUrl,
									book.bookTitle,
									book.author,
									book.rating
								)
							}
						>
							<FontAwesomeIcon
								icon={faPenToSquare}
								className="text-palette-primary "
							/>
						</button>
					</div>
				))}
				{isModalOpen && (
					<div
						className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none"
						role="dialog"
					>
						{/* Render the EditContent component */}
						<EditContent
							closeModal={closeModal}
							editFormContent={editFormContent}
							id={idOfBookToEdit}
						/>
					</div>
				)}
				<Link
					href="/books/add"
					className="h-50 w-56 m-4 rounded shadow-lg border border-palette-lighter flex flex-col justify-center bg-white"
				>
					<div className="h-48 relative flex items-center justify-center ">
						<div className="font-primary text-palette-primary text-2xl font-semibold text-center bg-palette-lighter p-10 rounded-sm">
							Add Book
						</div>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default BookListing;
