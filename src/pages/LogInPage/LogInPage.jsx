import "./LogInPage.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const LogInPage = () => {
  const [error, setError] = useState(null);

  const validateForm = () => {};

  return (
    <section className="signup">
      <section className="signup__card">
        <h2
          className={`signup__header ${error ? "signup__header--animate" : ""}`}
        >
          Login
        </h2>
        {error && <p className="signup__error">{error}</p>}
        <form className="signup__form" id="signup" onSubmit={validateForm}>
          <section className="signup__container">
            <label className="signup__label">Email:</label>
            <input
              className="signup__input"
              type="text"
              placeholder="email"
              name="signup_email"
            />
          </section>
          <section className="signup__container">
            <label className="signup__label">Password:</label>
            <input
              className="signup__input"
              type="password"
              placeholder="password"
              name="signup_password"
            />
          </section>
          <button className="signup__button" type="submit">
            Login
          </button>
        </form>
        <p className="signup__text">
          Don't have an account?{" "}
          <Link to="/signup" className=" signup__text signup__link">
            Create an account
          </Link>
        </p>
      </section>
    </section>
  );
};

export default LogInPage;
