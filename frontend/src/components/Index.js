import React, { useState } from "react";
import "../style-index.css";

import programming from "../assets/images/programming.webp";
import web_development from "../assets/images/web_development.jpg";
import math from "../assets/images/math.jpg";
import english from "../assets/images/english.jpg";
import predchadzajuci from "../assets/images/right-arrow-svgrepo-com.svg";
import nadchadzajuci from "../assets/images/right-arrow-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [form, setForm] = useState({ email: "", message: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
  const navigate = useNavigate();

  const courses = [
    {
      image: programming,
      alt: "Programovanie",
      title: "Kurz Programovania",
      description:
        "Naučíte sa základné aj pokročilé programovacie techniky.",
    },
    {
      image: math,
      alt: "Math",
      title: "Matematika",
      description:
        "Naučíte sa aplikovať matematické princípy. Kurz pokrýva rôzne oblasti matematiky.",
    },
    {
      image: web_development,
      alt: "Webový Vývoj",
      title: "Webový Vývoj",
      description:
        "Tento kurz vás prevedie tvorbou moderných webových stránok a aplikácií.",
    },
    {
      image: english,
      alt: "Angličtina",
      title: "Angličtina",
      description:
        "Tento kurz vám pomôže zlepšiť gramatiku, slovnú zásobu a komunikáciu.",
    },
  ];

  const testimonials = [
    { text: "„Toto je najlepší kurz, ktorý som absolvoval! Veľmi sa mi páčila praktická časť...“", author: "- Ján K." },
    { text: "„Lektori sú profesionáli, kurz je jasne štruktúrovaný a zrozumiteľný...“", author: "- Marta P." },
    { text: "„Kurzy, ktoré som absolvoval mi pomohli získať povýšenie v práci...“", author: "- Peter P." },
    { text: "„Veľmi profesionálny prístup, vrelo odporúčam všetkým :-)...“", author: "- Lenka A." },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(form.email) && form.message.trim() !== "";

    setForm({ ...form, [name]: value });
    setIsButtonDisabled(!isValid);

    if (!isValid) {
      setErrorMessage("Prosím, skontrolujte váš e-mail a uistite sa, že správa nie je prázdna.");
    } else {
      setErrorMessage("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Vaša správa bola odoslaná:\nEmail: ${form.email}\nSpráva: "${form.message}"`);
    setForm({ email: "", message: "" });
    setIsButtonDisabled(true);
    setErrorMessage("");
  };

  const handlePrevCourse = () => {
    setCurrentCourseIndex((prevIndex) =>
      prevIndex === 0 ? courses.length - 1 : prevIndex - 1
    );
  };

  const handleNextCourse = () => {
    setCurrentCourseIndex((prevIndex) =>
      prevIndex === courses.length - 1 ? 0 : prevIndex + 1
    );
  };

  const loadResponsiveCSS = () => {
    const width = window.innerWidth;
    let cssFile;

    if (width <= 700) cssFile = "style-700.css";
    else if (width <= 900) cssFile = "style-900.css";
    else if (width <= 1300) cssFile = "style-1300.css";
    else cssFile = "style-1600.css";

    const existingLink = document.getElementById("responsive-css");
    if (existingLink) existingLink.remove();

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = cssFile;
    link.id = "responsive-css";
    document.head.appendChild(link);
};

document.addEventListener("DOMContentLoaded", loadResponsiveCSS);
window.addEventListener("resize", loadResponsiveCSS);


  return (
    <main className="main-container">
      <div className="course-navigation">
        <button id="prev-course" className="nav-arrow" onClick={handlePrevCourse}>
          <img src={predchadzajuci} alt="Predchádzajúci" className="arrow-icon prev-icon" />
        </button>
        <button id="next-course" className="nav-arrow" onClick={handleNextCourse}>
          <img src={nadchadzajuci} alt="Nasledujúci" className="arrow-icon" />
        </button>
      </div>

      <div className="course-wrapper">
        <section className="course-grid">
          <div className="course-card">
            <img
              src={courses[currentCourseIndex].image}
              alt={courses[currentCourseIndex].alt}
              className="course-image"
            />
            <div className="course-content">
              <h3>{courses[currentCourseIndex].title}</h3>
              <p>{courses[currentCourseIndex].description}</p>
              <button
                type="button" className="btn-primary" onClick={() => navigate('/register')}>
                Zaregistrovať sa!
              </button>
            </div>
          </div>
        </section>
      </div>

      <section id="about-course" className="info-section">
        <h2>O kurzoch</h2>
        <p>Naše kurzy sú vytvorené na to, aby vám pomohli rozvinúť zručnosti v rôznych oblastiach...</p>
        <p>Okrem teoretických vedomostí získate aj praktické zručnosti...</p>
        <p>Pripravili sme kurzy pre všetkých, bez ohľadu na predchádzajúce skúsenosti...</p>
      </section>

      <section id="testimonials" className="info-section">
        <h2>Ohlasy študentov</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial" key={index}>
              <blockquote>
                <p>{testimonial.text}</p>
                <footer>{testimonial.author}</footer>
              </blockquote>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="info-section">
        <h2>Príklady projektov</h2>
        <div className="projects-grid">
          <div className="project">
            <p><strong>Vlastná webstránka:</strong> Naučíte sa vytvoriť a navrhnúť responzívnu webovú stránku...</p>
          </div>
          <div className="project">
            <p><strong>Interaktívna aplikácia:</strong> Vytvoríte mobilnú aplikáciu...</p>
          </div>
          <div className="project">
            <p><strong>Medzinárodný projekt:</strong> Vytvoríte prácu na ktorej budete pracovať so zahraničnými kolegami...</p>
          </div>
        </div>
      </section>

      <section id="feedback-form" className="info-section">
        <h2>Opýtajte sa nás</h2>
        <form id="contactForm" onSubmit={handleSubmit}>
          <label htmlFor="email">Váš email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="message">Vaša správa:</label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleInputChange}
            required
          />
          {errorMessage && <div id="error-message" style={{ color: "red" }}>{errorMessage}</div>}
          <button type="submit" className="btn-primary" disabled={isButtonDisabled}>
            Odoslať
          </button>
        </form>
      </section>

    </main>
  );
};

export default App;
