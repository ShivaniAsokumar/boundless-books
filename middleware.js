export { default } from 'next-auth/middleware';

export const config = {
	matcher: ['/books', '/books/add', '/favorites'],
};
