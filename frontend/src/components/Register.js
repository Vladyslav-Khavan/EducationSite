import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const courses = {
  matematika: {
    id: 1,
    name: "Matematika",
    subcategories: [
      { id: 1, name: "Aplikovaná matematika" },
      { id: 2, name: "Diskrétna matematika" },
      { id: 3, name: "Finančná matematika" },
    ],
  },
  anglictina: {
    id: 2,
    name: "Angličtina",
    subcategories: [
      { id: 4, name: "Konverzácia" },
      { id: 5, name: "Obchodná angličtina" },
      { id: 6, name: "Akademická angličtina" },
    ],
  },
  programovanie: {
    id: 3,
    name: "Programovanie",
    subcategories: [
      { id: 7, name: "Java" },
      { id: 8, name: "Python" },
      { id: 9, name: "C++" },
      { id: 10, name: "JavaScript" },
    ],
  },
  "webovy-vyvoj": {
    id: 4,
    name: "Webový vývoj",
    subcategories: [
      { id: 11, name: "HTML a CSS" },
      { id: 12, name: "React" },
      { id: 13, name: "Node.js" },
      { id: 14, name: "Full-stack vývoj" },
    ],
  },
};
const countries = [
  { value: "SLOVAKIA", label: "Slovakia" },
  { value: "CZECH_REPUBLIC", label: "Czech Republic" },
  { value: "POLAND", label: "Poland" },
  { value: "HUNGARY", label: "Hungary" },
  { value: "GERMANY", label: "Germany" },
  { value: "UKRAINE", label: "Ukraine" },
  { value: "NETHERLANDS", label: "Netherlands" },
  { value: "AUSTRIA", label: "Austria" },
  { value: "DENMARK", label: "Denmark" },
  { value: "ROMANIA", label: "Romania" },
];


const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthYear: "",
    email: "",
    phone: "",
    notes: "",
    country: "",
    course: "",
    subcategory: "",
    password1: "",
    password2: "",
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isPasswordLengthValid, setPasswordLengthValid] = useState(true);
  const [isValidPhone, setPhoneMatch] = useState(true);
  const [isValidEmail, setEmailMatch] = useState(true);
  const [isValidBirthYear, setBirthYearMatch] = useState(true);
  const [isValidLastName, setLastNameMatch] = useState(true);
  const [isValidFirstName, setFirstNameMatch] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false); // Track if the form is valid or not
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if form was successfully submitted
  const navigate = useNavigate();

  const [touchedFields, setTouchedFields] = useState({});

  const handleBlur = (e) => {
  const { name } = e.target;
  setTouchedFields({ ...touchedFields, [name]: true });
};


  const handleCourseChange = (e) => {
    const selectedCourse = e.target.value;
    setFormData({ ...formData, course: selectedCourse, subcategory: "" });
    setSubcategoryOptions(courses[selectedCourse]?.subcategories || []);
  };

  const handleSubcategoryChange = (e) => {
    const selectedSubcategoryId = e.target.value;
    setFormData({ ...formData, subcategory: selectedSubcategoryId });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  // Validate form when input changes
  useEffect(() => {
    const {
      firstName,
      lastName,
      birthYear,
      email,
      phone,
      course,
      subcategory,
      password1,
      password2,
    } = formData;
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+?[0-9]{9,15}$/;
    const namePattern = /^[a-zA-ZÀ-ÿ]{2,30}$/; 
    const currentYear = new Date().getFullYear();
    const birthYearPattern = new RegExp(`^(19[0-9]{2}|20[0-9]{2})$`);
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,100}$/;
  
    const isValidEmail = emailPattern.test(email);
    const isValidPhone = phonePattern.test(phone);
    const isValidFirstName = namePattern.test(firstName);
    const isValidLastName = namePattern.test(lastName);
    const isValidBirthYear = birthYearPattern.test(birthYear) && parseInt(birthYear, 10) <= currentYear;
    const isPasswordMatch = password1 === password2;
    const isPasswordLengthValid = passwordPattern.test(password1);
  
    const isFormComplete =
      firstName &&
      lastName &&
      birthYear &&
      email &&
      phone &&
      course &&
      subcategory &&
      password1 &&
      password2;
  
    setPasswordMatch(isPasswordMatch);
    setPasswordLengthValid(isPasswordLengthValid);
    setPhoneMatch(isValidPhone);
    setEmailMatch(isValidEmail);
    setBirthYearMatch(isValidBirthYear);
    setLastNameMatch(isValidLastName);
    setFirstNameMatch(isValidFirstName);
    
    setIsFormValid(
      isFormComplete &&
      isPasswordMatch &&
      isPasswordLengthValid &&
      isValidEmail &&
      isValidPhone &&
      isValidFirstName &&
      isValidLastName &&
      isValidBirthYear
    );
  
    // Встановлення повідомлень про помилки
    if (!isFormComplete) {
      setErrorMessage("Please fill in all required fields.");
    } else if (!isValidEmail) {
      setErrorMessage("Please enter a valid email.");
    } else if (!isValidPhone) {
      setErrorMessage("Please enter a valid phone number (9-15 digits).");
    } else if (!isValidFirstName) {
      setErrorMessage("First name must contain only letters (2-30 characters).");
    } else if (!isValidLastName) {
      setErrorMessage("Last name must contain only letters (2-30 characters).");
    } else if (!isValidBirthYear) {
      setErrorMessage("Birth year must be between 1900 and 2023.");
    } else if (!isPasswordMatch) {
      setErrorMessage("Passwords do not match.");
    } else if (!isPasswordLengthValid) {
      setErrorMessage(
        "Password must be 8-100 characters long, contain at least one digit, one letter, and one special character."
      );
    } else {
      setErrorMessage("");
    }
  }, [formData]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      // Handle successful form submission
      console.log('Form Submitted', formData);
      setIsSubmitted(true); // Mark as successfully submitted
    } else {
      setErrorMessage('Prosím, vyplňte všetky povinné údaje správne.');
    }
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

const submitForm = async () => {
  if (useEffect) {
    const selectedCourse = courses[formData.course];
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      birthYear: formData.birthYear,
      email: formData.email,
      phone: formData.phone,
      notes: formData.notes,
      country: formData.country,
      courseId: selectedCourse?.id || null,
      subcategoryId: parseInt(formData.subcategory, 10) || null,
      password: formData.password1,
    };

    console.log("Payload being sent:", payload);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users",
        payload
      );
      setFormData({
        firstName: "",
        lastName: "",
        birthYear: "",
        email: "",
        phone: "",
        notes: "",
        country: "",
        course: "",
        subcategory: "",
        password1: "",
        password2: "",
      });
    } catch (error) {
      console.error(error.response?.data?.message || "Error occurred!");
    }
  }
};


  return (
    <main className="form-container">
      {!isSubmitted ? (
        <form id="registrationForm" onSubmit={handleSubmit}>
            <label htmlFor="firstName">Meno:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {touchedFields.firstName && formData.firstName && !isValidFirstName && (
          <p className="error">First name must contain only letters (2-30 characters).</p>
        )}

        <label htmlFor="lastName">Priezvisko:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {touchedFields.lastName && formData.lastName && !isValidLastName && (
          <p className="error">Last name must contain only letters (2-30 characters).</p>
        )}

        <label htmlFor="birthYear">Rok narodenia:</label>
        <input
          type="number"
          id="birthYear"
          name="birthYear"
          min="1900"
          max={new Date().getFullYear()}
          value={formData.birthYear}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {touchedFields.birthYear && formData.birthYear && !isValidBirthYear && (
          <p className="error">Birth year must be between 1900 and {new Date().getFullYear()}.</p>
        )}

        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {touchedFields.email && formData.email && !isValidEmail && (
          <p className="error">Please enter a valid email address.</p>
        )}

        <label htmlFor="phone">Telefón:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {touchedFields.phone && formData.phone && !isValidPhone && (
          <p className="error">Phone number must be 9-15 digits and can optionally start with '+'.</p>
        )}

          <label htmlFor="notes">Poznamky:</label>
          <input
            type="notes"
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />

          <label htmlFor="country">Krajina:</label>
          <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
          >
          <option value="">Select a country</option>
          {countries.map((country) => (
          <option key={country.value} value={country.value}>
          {country.label}
          </option>
            ))}
          </select>

          <label htmlFor="course">Course:</label>
        <select
        id="course"
        name="course"
        value={formData.course} 
        onChange={handleCourseChange}
        required
      >
       <option value="">-- Select a course --</option>
       {Object.keys(courses).map((key) => (
       <option key={key} value={key}>
       {courses[key].name}
         </option>
         ))}
        </select>


          <label htmlFor="subcategory">Subcategory:</label>
          <select
            id="subcategory"
            name="subcategory"
            value={formData.subcategory}
            onChange={handleSubcategoryChange}
            disabled={!formData.course}
            required
          >
            <option value="">-- Select a subcategory --</option>
            {subcategoryOptions.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </select>

          <label htmlFor="password1">Heslo:</label>
        <input
          type="password"
          id="password1"
          name="password1"
          value={formData.password1}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {touchedFields.password1 && formData.password1 && !isPasswordLengthValid && (
          <p className="error">
            Password must be 8-100 characters long, contain at least one digit, one letter, and one special character.
          </p>
        )}

        <label htmlFor="password2">Potvrďte heslo:</label>
        <input
          type="password"
          id="password2"
          name="password2"
          value={formData.password2}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {touchedFields.password2 && formData.password2 && !passwordMatch && (
          <p className="error">Passwords do not match.</p>
        )}

          <button type="submit" onClick={submitForm} className="btn-primary" disabled={!isFormValid}>
            Odoslať
          </button>
        </form>
      ) : (
        <div id="confirmationMessage" className="confirmation-message">
          <p>Ďakujeme! Vaše údaje sme prijali. Čoskoro vám príde potvrdzujúci email.</p>
          <button type="button" className="btn-primary" onClick={() => navigate('/')}>
            Späť na hlavnú stránku
          </button>
        </div>
      )}
    </main>
  );
};

export default RegistrationForm;
