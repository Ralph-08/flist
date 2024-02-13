import "./SignUpPage.scss";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import MessagePromptModal from "../../components/MessagePromptModal/MessagePromptModal";
import Navbar from "../../components/Navbar/Navbar";

const SignUpPage = () => {
  const [error, setError] = useState(null);
  const [isSignedUp, setIsSginedUp] = useState(null);

  const navigate = useNavigate();

  const postSignUp = async (userObj) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/users/signup",
        userObj
      );
      document.getElementById("signup").reset();
      if (!res.data) {
        return setError("Email already in use");
      }
      setError(null);
      setIsSginedUp("Succesfully created account!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError("Something went wrong! Try again later");
    }
  };

  const validateSignUp = (e) => {
    e.preventDefault();
    const { signup_email, signup_password, signup_confirm_password } = e.target;

    if (!signup_email.value.split("").includes("@")) {
      return setError("Please enter a valid email address");
    }

    if (signup_password.value.split("").length <= 8) {
      return setError("Password must at least contain 8 characters");
    }

    if (signup_password.value !== signup_confirm_password.value) {
      return setError("Passwords must match");
    }

    postSignUp({
      email: signup_email.value,
      password: signup_password.value,
    });
  };
  return (
    <>
      <Navbar />
      <section className="signup">
        {isSignedUp && <MessagePromptModal text={isSignedUp} />}
        <section className="signup__card">
          <h2
            className={`signup__header ${
              error ? "signup__header--animate" : ""
            }`}
          >
            Create account
          </h2>
          {error && <p className="signup__error">{error}</p>}
          <form className="signup__form" id="signup" onSubmit={validateSignUp}>
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
            <section className="signup__container">
              <label className="signup__label">Confirm Password:</label>
              <input
                className="signup__input"
                type="password"
                placeholder="confrim password"
                name="signup_confirm_password"
              />
            </section>
            <button className="signup__button" type="submit">
              Sign Up
            </button>
          </form>
          <p className="signup__text">
            Have an account?{" "}
            <Link to="/" className=" signup__text signup__link">
              Login
            </Link>
          </p>
        </section>
      </section>
    </>
  );
};

export default SignUpPage;
