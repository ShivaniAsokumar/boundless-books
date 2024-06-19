import connectDB from '@/config/database';
import Book from '@/models/Book';
import { getSessionUser } from '@/utils/getSessionUser';

// GET /api/books
export const GET = async (req) => {
	try {
		await connectDB();

		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.userId) {
			return new Response('User ID is required', { status: 401 });
		}

		const { userId } = sessionUser;

		const books = await Book.find({ owner: userId });

		return new Response(JSON.stringify(books), {
			status: 200,
		});
	} catch (error) {
		console.log(error);
		return new Response('Something went wrong', { status: 500 });
	}
};

// POST /api/books
export const POST = async (req) => {
	try {
		await connectDB();

		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.userId) {
			return new Response('User ID is required', { status: 401 });
		}

		const { userId } = sessionUser;

		const { imageUrl, bookTitle, author } = await req.json();

		const newBook = new Book({
			imageUrl,
			bookTitle,
			author,
			owner: userId,
		});

		await newBook.save();

		return new Response(JSON.stringify({ success: true, data: newBook }), {
			status: 201,
		});
	} catch (error) {
		console.error(error);
		return new Response('Something went wrong', { status: 500 });
	}
};

// DELETE /api/books
export const DELETE = async (req) => {
	try {
		await connectDB();

		const { id } = await req.json();

		if (!id) {
			return new Response('Book ID is required', { status: 400 });
		}

		const deletedBook = await Book.findByIdAndDelete(id);

		if (!deletedBook) {
			return new Response('Book not found', { status: 404 });
		}

		return new Response(
			JSON.stringify({ success: true, data: deletedBook }),
			{
				status: 200,
			}
		);
	} catch (error) {
		console.error(error);
		return new Response({ status: 500, message: 'Something went wrong' });
	}
};

// PUT /api/books
export const PUT = async (req) => {
	try {
		await connectDB();

		const { id, imageUrl, bookTitle, author } = await req.json();

		console.log('Inside PUT:', imageUrl);

		// Check if the ID is provided
		if (!id) {
			return new Response('Book ID is required', { status: 400 });
		}

		// Find the book by ID
		const book = await Book.findById(id);

		// If the book doesn't exist, return a 404 Not Found response
		if (!book) {
			return new Response('Book not found', { status: 404 });
		}

		// Update the book with the provided data
		book.imageUrl = imageUrl;
		book.bookTitle = bookTitle;
		book.author = author;

		// Save the updated book
		await book.save();

		// Return a success response with the updated book
		return new Response(JSON.stringify({ success: true, data: book }), {
			status: 200,
		});
	} catch (error) {
		console.error(error);
		return new Response(
			JSON.stringify({ status: 500, message: 'Something went wrong' })
		);
	}
};
