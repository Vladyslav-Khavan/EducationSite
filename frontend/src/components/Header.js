import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importovanie Link z react-router-dom
import logo from "../assets/images/logo.png";
import lightBackground from "../assets/images/background.jpg";
import darkBackground from "../assets/images/background_black.png";


const Header = () => {
    const [theme, setTheme] = useState("light"); // Defaultný režim
    const [backgroundImage, setBackgroundImage] = useState(lightBackground); // Defaultná verzia pozadia

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        if (savedTheme === 'dark') {
            setBackgroundImage(darkBackground);
        } else {
            setBackgroundImage(lightBackground);
        }
        document.body.className = savedTheme + "-mode"; // Nastavenie triedy na <body>
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme); // Uloženie témy do miestneho úložiska
        if (newTheme === 'dark') {
            setBackgroundImage(darkBackground); // Tmavé pozadie pre tmavý režim
        } else {
            setBackgroundImage(lightBackground); // Svetlé pozadie pre svetlý režim
        }
        document.body.className = newTheme + "-mode"; // Nastavenie triedy na <body>
    };

    return (
        <header style={{ backgroundImage: `url(${backgroundImage})` }}>
            <button id="theme-switch" onClick={toggleTheme}>
                <svg
                    id="theme-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="white"
                >
                    <path
                        fill="white"
                        d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z"
                        className="light-icon"
                    />
                </svg>
            </button>
            <img src={logo} alt="Logo" className="logo" title="Logo" />
            <nav>
                <ul>
                    <li><Link to="/">Domov</Link></li>
                    <li><Link to="/hobbies">Lektori</Link></li>
                    <li><Link to="/changes">Sekcia Zmena</Link></li>
                    <li><Link to ="/vypis">Vypis Pouzivatelov</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
