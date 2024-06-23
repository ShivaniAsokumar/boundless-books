import { Schema, model, models } from 'mongoose';

const BookSchema = new Schema(
	{
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		imageUrl: {
			type: String,
			required: true,
		},
		bookTitle: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Book = models.Book || model('Book', BookSchema);

export default Book;
