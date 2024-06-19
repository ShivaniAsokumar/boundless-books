import React from 'react';

const Footer = () => {
	return (
		<footer className="border-t border-palette-lighter text-gray-900 bg-gray-50 py-6">
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex justify-between items-center">
					<div>
						<p className="text-lg font-bold font-primary">
							BoundlessBooks
						</p>
						<p className="text-sm">
							Your personal library, anywhere.
						</p>
					</div>
				</div>
				<div className="mt-4 text-sm">
					&copy; {new Date().getFullYear()} Boundless Books. All
					rights reserved.
				</div>
			</div>
		</footer>
	);
};

export default Footer;
