import React from 'react';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
import '@/assets/styles/globals.css';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import AuthProvider from '@/components/AuthProvider';

const MainLayout = ({ children }) => {
	return (
		<AuthProvider>
			<html lang="en">
				<body>
					<Header></Header>
					<Sidebar></Sidebar>
					<div>{children}</div>
				</body>
			</html>
		</AuthProvider>
	);
};

export default MainLayout;
