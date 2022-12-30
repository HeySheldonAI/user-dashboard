import './errorPage.css';

const ErrorPage = () => {
	return (
		<main className="error_page">
			<section className="error_page__content">
				<h1 className="error_page__content__title">404</h1>
				<p className="error_page__content__description">Page not found</p>
				<a href="https://heysheldon.com" className="error_page__content__link">
					Return to Home
				</a>
			</section>
		</main>
	);
};

export default ErrorPage;
