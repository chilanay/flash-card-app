import './home.css';
import Navbar from './navbar.jsx';

// Functional component representing the Home page
function Home() {
    // JSX structure for the Home component
    return (
        <>
            {/* Rendering the Navbar component */}
            <Navbar />

            {/* Header section with the title */}
            <header>
                <h1>My Portfolio</h1>
            </header>

            {/* General Introduction section */}
            <section>
                <h2>General Introduction</h2>
                {/* Personal introduction */}
                <p>Welcome to my portfolio. I am Chilanay Hajisoy. Junior Computer Science student at ADA University.</p>
            </section>

            {/* Projects section */}
            <section>
                <h2>Projects</h2>
                {/* List of projects with details */}
                <ul>
                    <li>
                        <strong>Project 1:</strong> Portfolio Page
                        <br />
                        {/* Link to GitHub Pages for Project 1 */}
                        <a href="https://chilanay.github.io/Portfolio-Page/" target="_blank">GitHub Pages</a>
                    </li>
                    <li>
                        <strong>Project 2:</strong> Product Display
                        <br />
                        {/* Link to GitHub Pages for Project 2 */}
                        <a href="https://chilanay.github.io/product-display/" target="_blank">GitHub Pages</a>
                    </li>
                    <li>
                        <strong>Project 3:</strong> Normalization of SQL Table
                        <br />
                        {/* Link to YouTube video for Project 3 */}
                        <a href="https://www.youtube.com/watch?v=dNeNaK3MQFc" target="_blank">YouTube Video</a>
                    </li>
                    <li>
                        <strong>Project 4:</strong> CRUD Books Application
                        <br />
                        {/* Link to GitHub Repository for Project 4 */}
                        <a href="https://github.com/chilanay/CRUD_books_application.git" target="_blank">GitHub Repository</a>
                    </li>
                    <li>
                        <strong>Project 5:</strong> Flash Cards App
                        <br />
                        {/* Link to GitHub Pages for Project 5 */}
                        <a href="https://chilanay.github.io/flash-card-app/" target="_blank">GitHub Pages</a>
                    </li>
                </ul>
            </section>
        </>
    );
}

// Exporting the Home component as the default export
export default Home;
