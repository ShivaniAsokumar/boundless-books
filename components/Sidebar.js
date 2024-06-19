'use client';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBook, faBookmark } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Sidebar = () => {
	const { data: session } = useSession();
	const [isOpen, setIsOpen] = useState(true);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			{session && (
				<>
					<button
						onClick={toggleSidebar}
						type="button"
						className="absolute top-0 left-0 z-50 inline-flex items-center justify-center w-10 h-10 p-2 text-palette-primary bg-white rounded-full shadow-md sm mt-4 ml-8"
					>
						<span className="sr-only">
							{isOpen ? 'Close sidebar' : 'Open sidebar'}
						</span>
						<FontAwesomeIcon
							icon={faBars}
							className="text-palette-primary text-xl p-2"
						/>
					</button>

					{/* Sidebar */}
					<aside
						id="default-sidebar"
						className={
							isOpen
								? ''
								: 'fixed top-0 left-0 z-40 w-64 h-screen bg-gray-50 transition-transform -translate-x-full sm:translate-x-0 pt-20 pl-5 rounded shadow-lg border border-palette-lighter'
						}
						aria-label="Sidebar"
					>
						{isOpen ? (
							''
						) : (
							<div className="h-full px-3 py-4 overflow-y-auto">
								<ul className="space-y-2 font-medium">
									{/* Sidebar items */}
									<li>
										<Link
											href="/books/"
											className="flex items-center p-2 text-palette-primary rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
										>
											<FontAwesomeIcon
												icon={faBook}
												className=" text-2xl"
											/>
											<span className="flex-1 ms-3">
												Books
											</span>
										</Link>
									</li>
									<li>
										<Link
											href="/favorites"
											className="flex items-center p-2 text-palette-primary rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
										>
											<FontAwesomeIcon
												icon={faBookmark}
												className="text-2xl"
											/>
											<span className="flex-1 ms-3 whitespace-nowrap">
												Favorites
											</span>
										</Link>
									</li>
								</ul>
							</div>
						)}
					</aside>
				</>
			)}
		</>
	);
};

export default Sidebar;
