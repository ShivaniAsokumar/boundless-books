'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import profileDefault from '@/public/profile.png';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
	const { data: session } = useSession();
	const profileImage = session?.user?.image;
	const [providers, setProviders] = useState(null);

	useEffect(() => {
		const setAuthProviders = async () => {
			const res = await getProviders();
			setProviders(res);
		};
		setAuthProviders();
	}, []);

	return (
		<header className="border-b border-palette-lighter sticky top-0 z-20 bg-white">
			<div className="flex items-center  mx-auto max-w-6xl px-6 pb-2 pt-4 md:pt-6">
				<Link href="/" className=" cursor-pointer">
					<h1 className="flex no-underline">
						<img
							height="32"
							width="32"
							alt="logo"
							className="h-8 w-8 mr-1 object-contain"
							src="/icon.svg"
						/>
						<span className="text-xl font-primary font-bold tracking-tight pt-1">
							BoundlessBooks
						</span>
					</h1>
				</Link>
				{!session &&
					providers &&
					Object.values(providers).map((provider, index) => (
						<button
							onClick={() => signIn(provider.id)}
							key={index}
							href="/"
							className="bg-palette-primary hover:bg-palette-dark text-white font-bold py-3 px-6 rounded-lg ml-auto"
						>
							Login
						</button>
					))}

				{session && (
					<>
						<button
							type="button"
							className="relative flex rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ml-auto"
							id="user-menu-button"
							aria-expanded="false"
							aria-haspopup="true"
						>
							<Image
								className="h-8 w-8 rounded-full"
								src={profileImage || profileDefault}
								alt=""
								width={40}
								height={40}
							/>
						</button>
						<button
							onClick={() => {
								signOut();
							}}
						>
							<FontAwesomeIcon
								icon={faRightFromBracket}
								className="ml-5 text-xl text-palette-primary hover:text-black"
							/>
						</button>
					</>
				)}
			</div>
		</header>
	);
};

export default Header;