import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Vypis.css";
import DOMPurify from "dompurify";

const Vypis = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    name: "",
    surname: "",
    country: "",
    birthYear: "",
  });
  const [sort, setSort] = useState({ sortBy: "id", sortDir: "asc" });
  const [originalUsers, setOriginalUsers] = useState([]);

  const sanitizeInput = (input) =>
    DOMPurify.sanitize(input, { ALLOWED_TAGS: ["b", "i", "strong"], ALLOWED_ATTR: [] });

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
    link.href = `/${cssFile}`;
    link.id = "responsive-css";
    document.head.appendChild(link);
  };

  useEffect(() => {
    loadResponsiveCSS();
    window.addEventListener("resize", loadResponsiveCSS);
    return () => window.removeEventListener("resize", loadResponsiveCSS);
  }, []);

  const toggleStatus = async (id, isActive) => {
    try {
      const response = await axios.patch(`http://localhost:8080/api/users/${id}/status`, {
        isActive: !isActive,
      });

      console.log("User status updated successfully", response.data);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, isActive: !isActive } : user
        )
      );
    } catch (error) {
      console.error("Failed to update user status", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`);
      console.log("User deleted successfully");

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users");
      const sanitizedUsers = response.data.map((user) => ({
        ...user,
        name: sanitizeInput(user.name),
        surname: sanitizeInput(user.surname),
        email: sanitizeInput(user.email),
        phone: sanitizeInput(user.phone),
        notes: sanitizeInput(user.notes),
        country: sanitizeInput(user.country),
        course: {
          name: sanitizeInput(user.course.name),
        },
        subcategory: {
          name: sanitizeInput(user.subcategory.name),
        },
      }));
      setUsers(sanitizedUsers);
      setOriginalUsers(sanitizedUsers);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch users. Please try again later.");
      setLoading(false);
    }
  };

  const fetchFilteredUsers = async () => {
    try {
      const { name, surname, country, birthYear } = filters;
      const response = await axios.get("http://localhost:8080/api/users/search", {
        params: { name, surname, country, birthDate: birthYear },
      });
      const sanitizedUsers = response.data.map((user) => ({
        ...user,
        name: sanitizeInput(user.name),
        surname: sanitizeInput(user.surname),
        notes: sanitizeInput(user.notes),
      }));
      setUsers(sanitizedUsers);
    } catch (err) {
      setError("Failed to filter users. Please try again later.");
    }
  };

  const fetchSortedUsers = async (sortBy, sortDir) => {
    try {
      const response = await axios.get("http://localhost:8080/api/users/sort", {
        params: { sortBy, sortDir },
      });
      const sanitizedUsers = response.data.map((user) => ({
        ...user,
        name: sanitizeInput(user.name),
        surname: sanitizeInput(user.surname),
        notes: sanitizeInput(user.notes),
      }));
      setUsers(sanitizedUsers);
    } catch (err) {
      setError("Failed to sort users. Please try again later.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSort = (sortBy) => {
    const newSortDir = sort.sortDir === "asc" ? "desc" : "asc";
    setSort({ sortBy, sortDir: newSortDir });
    fetchSortedUsers(sortBy, newSortDir);
  };

  const resetTable = () => {
    setUsers(originalUsers);
    setFilters({ name: "", surname: "", country: "", birthYear: "" });
    setSort({ sortBy: "id", sortDir: "asc" });
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="vypis-container">
      <h1>List of Registered Users</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Filter by Name"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          placeholder="Filter by Surname"
          name="surname"
          value={filters.surname}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          placeholder="Filter by Country"
          name="country"
          value={filters.country}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          placeholder="Filter by Birth Year"
          name="birthYear"
          value={filters.birthYear}
          onChange={handleFilterChange}
        />
        <button onClick={fetchFilteredUsers}>Apply Filters</button>
        <button onClick={resetTable}>Back</button>
      </div>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>         
              <th onClick={() => handleSort("name")}>First Name</th>
              <th onClick={() => handleSort("surname")}>Last Name</th>
              <th onClick={() => handleSort("birthYear")}>Birth Year</th>
              <th onClick={() => handleSort("email")}>Email</th>
              <th onClick={() => handleSort("phone")}>Phone</th>
              <th onClick={() => handleSort("notes")}>Notes</th>
              <th onClick={() => handleSort("country")}>Country</th>
              <th>Course</th>
              <th>Subcategory</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.birthYear}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.notes}</td>
                <td>{user.country}</td>
                <td>{user.course.name}</td>
                <td>{user.subcategory.name}</td>
                <td>{user.isActive ? "Active" : "Inactive"}</td>
                <td>
                  <button
                    onClick={() => toggleStatus(user.id, user.isActive)}
                    className={user.isActive ? "deactivate-btn" : "activate-btn"}
                  >
                    {user.isActive ? "Deactivate" : "Activate"}
                  </button>
                  {!user.isActive && (
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Vypis;
