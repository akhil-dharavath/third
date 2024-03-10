import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../config/login";

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
    const data = login.filter((user) => user.email === details.email);
    if (data.length > 0 && data[0].password === details.password) {
      const selectedIds = localStorage.getItem("selectedIds");
      const ids = selectedIds ? selectedIds.split(",") : [];
      // console.log(ids,data[0].id.toString());
      if (
        ids.length > 0 &&
        ids.filter((acct) => acct === data[0].id.toString()).length > 0
      ) {
        alert("Invalid login credentials");
        return;
      }
      localStorage.setItem("userid", data[0].id);
      localStorage.setItem("name", data[0].name);
      localStorage.setItem("email", data[0].email);
      localStorage.setItem("password", data[0].password);
      localStorage.setItem("role", data[0].role);
      navigate("/");
    } else {
      alert("Invalid login credentials!");
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
