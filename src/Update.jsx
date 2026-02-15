import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "./config";

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    axios
      .get(`${API}/getUser/${id}`)
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
        setAge(res.data.age);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const Update = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API}/updateUser/${id}`, {
        name,
        email,
        age: Number(age),
      });

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div>
      <h2>Update User</h2>

      <form onSubmit={Update}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default Update;
