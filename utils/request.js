// Fetch all books
async function fetchBooks() {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/books`);

		if (!res.ok) {
			throw new Error('Failed to fetch data');
		}

		return res.json();
	} catch (error) {
		console.log(error);
	}
}

// Fetch single book
async function fetchBook(id) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_DOMAIN}/books/${id}`
		);

		if (!res.ok) {
			throw new Error('Failed to fetch data');
		}

		return res.json();
	} catch (error) {
		console.log(error);
		return null;
	}
}

async function deleteBook(id) {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/books`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: id,
			}),
		});

		if (!res.ok) {
			throw new Error('Failed to delete book');
		}

		return res;
	} catch (error) {
		console.error('Error:', error);
	}
}

export { fetchBooks, fetchBook, deleteBook };
