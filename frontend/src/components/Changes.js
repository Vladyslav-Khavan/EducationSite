import React, { useState, useEffect } from "react";
import "../style-changes.css";
import test from "../assets/images/test_image.webp";

function App() {
  const [currentSize, setCurrentSize] = useState(2);

  const applyFontSize = (size) => {
    const section = document.getElementById("sekcia_zmena");
    let fontSize;
    let sectionClass;

    switch (size) {
      case 1:
        fontSize = "14px";
        sectionClass = "small";
        break;
      case 2:
        fontSize = "18px";
        sectionClass = "medium";
        break;
      case 3:
        fontSize = "22px";
        sectionClass = "large";
        break;
      default:
        fontSize = "18px";
        sectionClass = "medium";
    }

    if (section) {
      section.style.fontSize = fontSize;
      section.className = sectionClass;
    }
  };

  const updateFontSize = (value) => {
    const newSize = parseInt(value);
    setCurrentSize(newSize);
    applyFontSize(newSize);
  };

  const increaseFontSize = () => {
    if (currentSize < 3) {
      const newSize = currentSize + 1;
      setCurrentSize(newSize);
      applyFontSize(newSize);
    }
  };

  const decreaseFontSize = () => {
    if (currentSize > 1) {
      const newSize = currentSize - 1;
      setCurrentSize(newSize);
      applyFontSize(newSize);
    }
  };

  const resetFontSize = () => {
    setCurrentSize(2);
    applyFontSize(2);
  };

  const changeFontSize = (size) => {
    let newSize;
    if (size === "large") newSize = 3;
    else if (size === "medium") newSize = 2;
    else if (size === "small") newSize = 1;

    setCurrentSize(newSize);
    applyFontSize(newSize);
  };

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.altKey && event.key === "ArrowUp") {
        event.preventDefault();
        increaseFontSize();
      }
      if (event.altKey && event.key === "ArrowDown") {
        event.preventDefault();
        decreaseFontSize();
      }
      if (event.altKey && event.key === "0") {
        event.preventDefault();
        resetFontSize();
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [currentSize]);

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
    <div className="App">
      

      <main className="content">
        {/* Pôvodná sekcia nalavo */}
        <section id="sekcia_zmena">
          <h2>Vykonané zmeny z pohľadu UX/UI</h2>
          <div className="card-container">
            <div className="card">
              <h3>Zvýšenie prístupnosti</h3>
              <ul>
                <li>Alternatívny text (alt text) pre obrázky</li>
                <li>Prístupné navigačné menu</li>
              </ul>
            </div>

            <div className="card">
              <h3>Vylepšenie dizajnu</h3>
              <ul>
                <li>Zlepšenie kontrastu</li>
                <li>Použitie písma vhodného pre čitateľnosť</li>
                <li>Flexibilný dizajn</li>
                <li>Možnosť prepínať medzi svetlým a tmavým módom</li>
              </ul>
            </div>

            <div className="card">
              <h3>Interaktivita a spätná väzba</h3>
              <ul>
                <li>Pridané jednoduché animácie</li>
                <li>Nápovedy a popisy</li>
              </ul>
            </div>

            <div className="card">
              <h3>Zlepšenie formulárov</h3>
              <ul>
                <li>Prístupné formuláre</li>
                <li>Nápovedy pri vyplňovaní</li>
              </ul>
            </div>
          </div>
          <br />
          <h2>Zmeny obsahu pomocou JavaScript funkcie</h2>
          <div className="card-container">
            <div className="card">
              <h3>Zmena veľkosti posuvníkom</h3>
              <p>Používatelia môžu meniť veľkosť textu plynule pomocou posuvného baru, ktorý umožňuje nastavenie od najmenšieho po najväčší rozmer.</p>
            </div>

            <div className="card">
              <h3>Zmena veľkosti pomocou tlačidiel</h3>
              <p>Použitím tlačidiel „Malé“, „Stredné“ a „Veľké“ sa nastaví preddefinovaná veľkosť obsahu.</p>
            </div>

            <div className="card">
              <h3>Zmena veľkosti klávesovými skratkami</h3>
              <p>Na zväčšenie alebo zmenšenie textu použite klávesy:</p>
              <ul>
                <li><strong>Alt + Šípka nahor</strong> + zväčšiť</li>
                <li><strong>Alt + Šípka nadol</strong> - zmenšiť</li>
              </ul>
            </div>

            <div className="card">
              <h3>Testovacia karta</h3>
              <p>Obrázok na testovanie zmeny veľkosti aj pre obrázky.</p>
              <div className="center-image">
              <img src={test} alt="Obrázok pre skúšanie" id="test_image" title="Testovací obrázok" />
              </div>
            </div>
          </div>
        </section>

        {/* Slider pre zmenu veľkosti */}
        <div className="sizebar-container">
          <label htmlFor="sizeSlider">Veľkosť:</label><br />
          <div className="control-buttons">
            <button onClick={decreaseFontSize} className="resize-btn">-</button>
            <input
              type="range"
              id="sizeSlider"
              min="1"
              max="3"
              step="1"
              value={currentSize}
              onChange={(e) => updateFontSize(e.target.value)}
            />
            <button onClick={increaseFontSize} className="resize-btn">+</button>
          </div>
          <br />
          <button onClick={() => changeFontSize("large")} className="btn-primary" style={{width:"80px"}}>Veľké</button>
          <button onClick={() => changeFontSize("medium")} className="btn-primary" style={{width:"80px"}}>Stredné</button>
          <button onClick={() => changeFontSize("small")} className="btn-primary" style={{width:"80px"}}>Malé</button>
          <br /> 
        <p>Stlačte Alt+Šípka nahor!</p>
        <p>Stlačte Alt+Šípka nadol!</p>
        </div>
      </main>
    </div>
  );
}

export default App;
