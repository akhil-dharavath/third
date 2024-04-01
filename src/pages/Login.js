import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../api/authentication";

const Login = () => {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginApi(details);
    if (response.data) {
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } else {
      alert(response.response.data.message);
    }
  };
  return (
    <div className="container logSign">
      <h2 className="text-center h2">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
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
            value={details.password}
            onChange={handleChange}
          />
        </div>
        <div className="buttonContainer">
          <button type="submit" className="btn btn-success login my-2">
            Log In
          </button>
          <Link
            to="/register"
            role="button"
            className="btn btn-primary signup my-2"
          >
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
