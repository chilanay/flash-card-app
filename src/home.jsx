import React, { useEffect, useState } from 'react';
import './home.css';
import Navbar from './navbar.jsx'

function Home() {
    return (
        <>
            <Navbar />

            {/* <div id="navbar" class="nav-links">
                <a id="navhome" href="home.html">Home</a>
                <a class="navother" href="public\contactme.html">Flash Cards</a>
                <a class="navother" href="public\questionnaire.html">Contact Me</a>
            </div>


            <nav>
                <li><a href="home.html">Home</a></li>
                <li><a href="flash-cards.html">Flash Cards</a></li>
                <li><a href="#"></a></li>
            </nav> */}

            <header>
                <h1>My Portfolio</h1>
            </header>


            <section>
                <h2>General Introduction</h2>
                <p>Welcome to my portfolio. I am Chilanay Hajisoy. Junior Computer Science student at ADA University.</p>
            </section>

            <section>
                <h2>Projects</h2>
                <ul>
                    <li>
                        <strong>Project 1:</strong> Portfolio Page
                        <br />
                        <a href="https://chilanay.github.io/Portfolio-Page/" target="_blank">GitHub Pages</a>
                    </li>
                    <li>
                        <strong>Project 2:</strong> Product Display
                        <br />
                        <a href="https://chilanay.github.io/product-display/" target="_blank">GitHub Pages</a>
                    </li>
                    <li>
                        <strong>Project 3:</strong> Normalization of SQL Table
                        <br />
                        <a href="https://www.youtube.com/watch?v=dNeNaK3MQFc" target="_blank">YouTube Video</a>
                    </li>
                    <li>
                        <strong>Project 4:</strong> CRUD Books Application
                        <br />
                        <a href="https://github.com/chilanay/CRUD_books_application.git" target="_blank">GitHub Repository</a>
                    </li>
                    <li>
                        <strong>Project 5:</strong> Flash Cards App
                        <br />
                        <a href="https://chilanay.github.io/flash-card-app/" target="_blank">GitHub Pages</a>
                    </li>
                </ul>
            </section>

        </>
    )
}

export default Home;