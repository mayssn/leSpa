import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import img from "../../imgs/snap.png";

const AdminLogin = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const changeHanlder = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("/api/admin", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          console.log("here");
          window.sessionStorage.setItem("isAuth", JSON.stringify(data.data));
          navigate("/admin/quote");
        }
      });
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="email"
        name="email"
        onChange={changeHanlder}
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        onChange={changeHanlder}
      />
      <button>Log in</button>
    </form>
  );
};

export default AdminLogin;
