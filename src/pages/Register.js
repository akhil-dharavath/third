import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../api/authentication";

const Register = () => {
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };
  
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await registerApi(details);
    if (response.data) {
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } else {
      alert(response.response.data.message);
    }
  };
  return (
    <div className="container logSign">
      <h2 className="text-center h2">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            User Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="username"
            required
            value={details.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            required
            value={details.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            required
            value={details.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="confirmPassword"
            required
            value={details.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="buttonContainer">
          <button type="submit" className="btn btn-success login my-2">
            Sign In
          </button>
          <Link
            to="/login"
            role="button"
            className="btn btn-primary signup my-2"
          >
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
