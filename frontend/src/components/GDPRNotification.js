import React, { useState } from "react";

const GDPRNotification = () => {
  const [showNotification, setShowNotification] = useState(true);

  const handleAccept = () => {
    setShowNotification(false);
    // Tu môžeš pridať napríklad ukladanie súhlasu do localStorage
    localStorage.setItem("gdprAccepted", "true");
  };

  return (
    showNotification && (
      <div style={styles.container}>
        <p style={styles.text}>
          Táto stránka používa súbory cookies a spracováva vaše osobné údaje v súlade s GDPR. 
          Pre pokračovanie na stránke prosím odsúhlaste podmienky.
        </p>
        <button style={styles.button} onClick={handleAccept}>
          Súhlasím
        </button>
      </div>
    )
  );
};

const styles = {
  container: {
    position: "fixed",
    bottom: "20px",
    left: "20px",
    right: "20px",
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
  },
  text: {
    margin: 0,
    marginBottom: "10px",
    fontSize: "14px",
    color: "#333",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default GDPRNotification;