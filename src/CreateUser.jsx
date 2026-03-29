import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "./config";

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const Submit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/createUser`, {
        name,
        email,
        age: Number(age),
      });

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error creating user");
    }
  };

  return (
    <div>
      <h2>Create User</h2>

      <form onSubmit={Submit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateUser;
