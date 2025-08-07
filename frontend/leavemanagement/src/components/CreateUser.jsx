import React, { useState } from "react";
import axios from "axios";

const CreateUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "EMPLOYEE", // default role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/users", user)
      .then((res) => {
        alert("User created successfully!");
        setUser({ name: "", email: "", role: "EMPLOYEE" });
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to create user.");
      });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          name="name"
          value={user.name}
          onChange={handleChange}
          required
          type="text"
        /><br /><br />

        <label>Email:</label>
        <input
          name="email"
          value={user.email}
          onChange={handleChange}
          required
          type="email"
        /><br /><br />

        <label>Role:</label>
        <select
          name="role"
          value={user.role}
          onChange={handleChange}
        >
          <option value="EMPLOYEE">Employee</option>
          <option value="MANAGER">Manager</option>
        </select><br /><br />

        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
