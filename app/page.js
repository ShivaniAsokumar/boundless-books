import React from 'react';
import Footer from '@/components/Footer';
import Link from 'next/link';

const Page = () => {
	return (
		<div className="">
			<div className="max-w-7xl mx-auto px-4 py-12 text-center">
				<h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 font-primary">
					Welcome to BoundlessBooks!
				</h1>
				<p className="text-lg text-gray-700 mb-8 ">
					Your personal library, anywhere.
				</p>
			</div>

			{/* Illustrative Section */}
			<section className="py-20">
				<div className="max-w-7xl mx-auto px-4">
					<div className="text-center">
						<img
							src="/reading.svg"
							alt="Book Illustration"
							className="mx-auto mb-8"
							style={{ maxWidth: '400px' }}
						/>
						<p className="text-lg text-gray-700">
							Immerse yourself in a world of endless stories and
							possibilities.
						</p>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="bg-white py-20">
				<div className="max-w-7xl mx-auto px-4">
					<h2 className="text-4xl font-bold text-gray-900 mb-8 text-center  font-primary">
						Key Features
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						<div className="flex items-center mb-6">
							<div className="mr-6">
								<svg
									className="w-12 h-12 text-palette-primary"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM5 20v-2a7 7 0 0114 0v2M12 18v4m0 0a2 2 0 01-2-2h4a2 2 0 01-2 2"
									></path>
								</svg>
							</div>
							<div>
								<h3 className="text-2xl font-semibold text-gray-800 mb-2  ">
									Track Your Reading Progress
								</h3>
								<p className="text-gray-700">
									Keep track of the books you're reading,
									pages read, and set reading goals.
								</p>
							</div>
						</div>
						<div className="flex items-center mb-6">
							<div className="mr-6">
								<svg
									className="w-12 h-12 text-palette-primary"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M13 10V3L4 14h7v7l9-11h-7z"
									></path>
								</svg>
							</div>
							<div>
								<h3 className="text-2xl font-semibold text-gray-800 mb-2  ">
									Favorite Books
								</h3>
								<p className="text-gray-700">
									Add your favorite books and explore them in
									their dedicated page.
								</p>
							</div>
						</div>
						<div className="flex items-center mb-6">
							<div className="mr-6">
								<svg
									className="w-12 h-12 text-palette-primary"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M12 14l9-5-9-5-9 5 9 5z"
									></path>
								</svg>
							</div>
							<div>
								<h3 className="text-2xl font-semibold text-gray-800 mb-2  ">
									Edit Your Books
								</h3>
								<p className="text-gray-700">
									Feel free to edit or delete any book from
									your tracker.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer></Footer>
		</div>
	);
};

export default Page;
