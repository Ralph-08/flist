import "./LogInPage.scss";
import { Link } from "react-router-dom";
import { useState } from "react";

const LogInPage = () => {
  const [slideIn, setSlideIn] = useState(false);

  const handleContainer = () => {
    !slideIn ? setSlideIn(true) : setSlideIn(false);
  };

  return (
    <>
      <section className="login">
        <section className="login__holder">
          <section className="login__card">
            <form className="login__form" action="">
              <h2 className="login__header">Login</h2>
              <section className="login__container">
                <label className="login__label">Email:</label>
                <input
                  className="login__input"
                  type="text"
                  placeholder="email"
                />
              </section>
              <section className="login__container">
                <label className="login__label">Password:</label>
                <input
                  className="login__input"
                  type="password"
                  placeholder="password"
                />
              </section>
              <Link to="/dashboard">
                <button className="login__button">Login</button>
              </Link>
            </form>
          </section>
          <section className="login__card">
            <form className="login__form" action="">
              <h2 className="login__header">Create account</h2>
              <section className="login__container">
                <label className="login__label">Email:</label>
                <input
                  className="login__input"
                  type="text"
                  placeholder="email"
                />
              </section>
              <section className="login__container">
                <label className="login__label">Password:</label>
                <input
                  className="login__input"
                  type="password"
                  placeholder="password"
                />
              </section>
              <section className="login__container">
                <label className="login__label">Confirm Password:</label>
                <input
                  className="login__input"
                  type="password"
                  placeholder="confrim password"
                />
              </section>
              <Link to="/dashboard">
                <button className="login__button">Sign Up</button>
              </Link>
            </form>
          </section>
          {!slideIn ? (
            <div className="container container--slide-right">
              <h1 className="container__header">Don't have an account?</h1>
              <button onClick={handleContainer} className="container__button">
                Sign Up
              </button>
            </div>
          ) : (
            <div className="container container--slide-left">
              <h1 className="container__header">Already have an account?</h1>
              <button
                onClick={handleContainer}
                className="container__button container__button--smaller"
              >
                Log in
              </button>
            </div>
          )}
        </section>
      </section>
    </>
  );
};

export default LogInPage;
