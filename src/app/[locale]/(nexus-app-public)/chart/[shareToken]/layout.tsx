import React from 'react';

const Layout: React.FC = ({ children }:any) => {
	return (
		<body className="flex flex-col items-center bg-transparent">
			<header>
				<meta name="robots" content="noindex" />
			</header>
			<main>
				{children}
			</main>

			{/* Add your footer component here */}
			<footer>
				{/* Footer content */}
			</footer>
		</body>
	);
};

export default Layout;