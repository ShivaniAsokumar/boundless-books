import connectDB from '@/config/database';
import Book from '@/models/Book';

// GET /api/books/:id
export const GET = async (req, { params }) => {
	try {
		await connectDB();

		const book = await Book.findById(params.id);

		if (!book) return new Response('Book Not Found', { status: 404 });

		return new Response(JSON.stringify(book), {
			status: 200,
		});
	} catch (error) {
		console.log(error);
		return new Response('Something went wrong', { status: 500 });
	}
};
