import connectDB from '@/config/database';
import User from '@/models/User';
import Book from '@/models/Book';
import { getSessionUser } from '@/utils/getSessionUser';

// GET /api/favorites
export const GET = async (req) => {
	try {
		await connectDB();

		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.userId) {
			return new Response('User ID is required', { status: 401 });
		}

		const { userId } = sessionUser;

		// Find user in database
		const user = await User.findOne({ _id: userId });

		// Get user favorites
		const favorites = await Book.find({ _id: { $in: user.favorites } });

		return new Response(JSON.stringify(favorites), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response('Something went wrong', { status: 200 });
	}
};

// POST /api/favorites
export const POST = async (req) => {
	try {
		await connectDB();

		const { bookId } = await req.json();

		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.userId) {
			return new Response('User ID is required', { status: 401 });
		}

		const { userId } = sessionUser;

		// Find user in database
		const user = await User.findOne({ _id: userId });

		// Check if book is a favorite
		let isFavorite = user.favorites.includes(bookId);

		let message;

		if (isFavorite) {
			// If already favorite, we remove it
			user.favorites.pull(bookId);
			message = 'Favorite removed successfully';
			isFavorite = false;
		} else {
			// If not favorite, add it
			user.favorites.push(bookId);
			message = 'Favorite added successfully';
			isFavorite = true;
		}

		await user.save();

		return new Response(JSON.stringify({ message, isFavorite }), {
			status: 200,
		});
	} catch (error) {
		console.log(error);
		return new Response('Something went wrong', { status: 500 });
	}
};
