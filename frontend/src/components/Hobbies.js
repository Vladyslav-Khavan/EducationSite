import React, { useState } from "react";
import "../style-hobbies.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import david from "../assets/images/david.jpg";
import daniel from "../assets/images/daniel.jpg";
import jakub from "../assets/images/jakub.webp";
import vladyslav from "../assets/images/vladyslav.jpg";


function Hobbies() {
  const [ratings, setRatings] = useState({});
  const [ratingText, setRatingText] = useState({});
  const [showModal, setShowModal] = useState(null); // Na sledovanie, ktorá modal sa zobrazuje

  const handleRating = (personId, rating) => {
    let text = "";
    switch (rating) {
      case 1:
        text = "Slabé";
        break;
      case 2:
        text = "Podpriemerné";
        break;
      case 3:
        text = "Priemerné";
        break;
      case 4:
        text = "Dobre";
        break;
      case 5:
        text = "Výborné";
        break;
      default:
        text = "Žiadne hodnotenie";
    }

    setRatings((prevRatings) => ({
      ...prevRatings,
      [personId]: rating,
    }));

    setRatingText((prevText) => ({
      ...prevText,
      [personId]: text,
    }));
  };

  const handleShowModal = (id) => {
    setShowModal(id); // Otvoriť modal s konkrétnym ID
  };

  const handleCloseModal = () => {
    setShowModal(null); // Zavrieť modal
  };

  const persons = [
    {
      id: 1,
      name: "Dávid",
      lastName: "Gonda",
      image: david,
      interests: "Šport, zvieratá, turistika, posilňovanie, priatelia, technológie, hry",
      description:
        "Dávid je nadšenec aktívneho životného štýlu a vášnivý športovec, ktorý si užíva rôzne športy, ako je plávanie, posilňovanie a beh. Okrem športu má silný vzťah k zvieratám a často trávi čas s domácimi zviratami. Turistika je pre neho spôsob, ako sa spojiť s prírodou a relaxovať po náročnom týždni. Posilňovanie mu pomáha udržiavať si kondíciu a zdravý životný štýl. Rád sa stretáva s priateľmi, s ktorými zdieľa zážitky a spoločné aktivity. Je tiež technicky zdatný a rád sleduje novinky v technológii, pričom sa zaujíma o video hry, ktoré mu poskytujú zábavu a možnosť oddychu.",
    },
    {
      id: 2,
      name: "Daniel",
      lastName: "Konečný",
      image: daniel,
      interests: "Šport, cyklistika, hry, zvieratá, technológie",
      description:
        "Daniel je aktívny športovec a nadšenec cyklistiky, ktorý rád trávi čas vonku a zlepšuje svoje športové schopnosti. Okrem toho sa venuje aj hrám, kde nachádza priestor na relax a zábavu. Miluje zvieratá a má blízky vzťah k prírode. Zaujíma sa o technológie a sleduje nové trendy, ktoré mu pomáhajú rozvíjať svoje záľuby a poznatky.",
    },
    {
      id: 3,
      name: "Vladyslav",
      lastName: "Khavan",
      image: vladyslav,
      interests: "Futbal, stolný tenis, programovanie, matematika",
      description:
        "Vladyslav je nadšený programátor a pedagóg, ktorý s radosťou odovzdáva svoje vedomosti ďalej. Vo voľnom čase sa venuje športom, najmä futbalu a stolnému tenisu, ktoré ho učia tímovej spolupráci a presnosti. Programovanie a matematika sú jeho vášeň, kde neustále objavuje nové výzvy a logické súvislosti. So študentmi sa snaží zdieľať svoje skúsenosti a inšpirovať ich k tomu, aby neprestávali objavovať svet vedy a technológie.",
    },
    {
      id: 4,
      name: "Jakub",
      lastName: "Bajo",
      image: jakub,
      interests: "Programovanie, hry, cestovanie",
      description:
        "Jakub je vášnivý programátor, ktorý rád trávi hodiny nad novými projektmi a vymýšľa kreatívne riešenia. Vo voľnom čase sa venuje hrám, najmä strategickým a logickým, ktoré mu pomáhajú rozvíjať logické myslenie. Cestovanie je jeho spôsob, ako si odpočinúť a načerpať inšpiráciu na ďalšie projekty. Najradšej cestuje do horských oblastí, kde si môže oddýchnuť od každodenného ruchu.",
    },
  ];

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
    <div className="text-light">
      <div className="container blur my-5 p-3">
        <div className="row">
          {persons.map((person) => (
            <div key={person.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card">
                <img
                  src={person.image}
                  className="card-img-top"
                  alt={`Foto ${person.name}`}
                  title={`Lektor ${person.name}`}
                />
                <div className="card-body text-center">
                  <h5 className="card-title text-dark font-weight-bold">
                    Meno: {person.name}
                  </h5>
                  <p className="text-dark font-weight-bold">
                    Priezvisko: {person.lastName}
                  </p>
                  <button
                    className="btn btn-primary btn-outline-info"
                    onClick={() => handleShowModal(person.id)}
                  >
                    Zobraziť záujmy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          style={{ display: "block" }}
          id={`modal-${showModal}`}
          tabIndex="-1"
          aria-labelledby={`modalLabel-${showModal}`}
          aria-hidden="false"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`modalLabel-${showModal}`}>
                  Záujmy a opis
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {persons
                  .filter((person) => person.id === showModal)
                  .map((person) => (
                    <div key={person.id}>
                      <p>
                        <strong>Záujmy:</strong> {person.interests}
                      </p>
                      <p>
                        <strong>Opis:</strong> {person.description}
                      </p>
                      {/* Hodnotenie */}
                      <div className="rating">
                        <strong>Hodnotenie:</strong>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`star ${
                              ratings[person.id] >= star ? "filled" : ""
                            }`}
                            onClick={() => handleRating(person.id, star)}
                          >
                            &#9733;
                          </span>
                        ))}
                        <span className="ms-2">
                          {ratings[person.id]
                            ? `Hodnotenie: ${ratings[person.id]}`
                            : "Žiadne hodnotenie"}
                        </span>
                        <p className="mt-2">
                          {ratingText[person.id]
                            ? `Textové hodnotenie: ${ratingText[person.id]}`
                            : "Žiadne textové hodnotenie"}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Zatvoriť
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Hobbies;
