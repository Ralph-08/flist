import "./LogInPage.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";

const LogInPage = () => {
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const postLogin = async (userLogin) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/users/login",
        userLogin
      );
      if (!res.data) {
        return setError("Incorrect email or password");
      }
      sessionStorage.setItem("token", res.data.token)
      navigate("/dashboard")
    } catch (err) {
      setError("Something went wrong! Try again later");
    }
  };

  const validateForm = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    if (!email.value || !password.value)
      return setError("All fields must be filled");
    postLogin({ email: email.value, password: password.value });
  };

  return (
    <>
    <Navbar />
    <section className="login">
      <section className="login__card">
        <h2
          className={`login__header ${error ? "login__header--animate" : ""}`}
        >
          Login
        </h2>
        {error && <p className="login__error">{error}</p>}
        <form className="login__form" id="login" onSubmit={validateForm}>
          <section className="login__container">
            <label className="login__label">Email:</label>
            <input
              className="login__input"
              type="text"
              placeholder="email"
              name="email"
            />
          </section>
          <section className="login__container">
            <label className="login__label">Password:</label>
            <input
              className="login__input"
              type="password"
              placeholder="password"
              name="password"
            />
          </section>
          <button className="login__button" type="submit">
            Login
          </button>
        </form>
        <p className="login__text">
          Don't have an account?{" "}
          <Link to="/signup" className=" login__text login__link">
            Sign up
          </Link>
        </p>
      </section>
    </section>
    </>

  );
};

export default LogInPage;
