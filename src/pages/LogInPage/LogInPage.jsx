import "./LogInPage.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const LogInPage = () => {






  return (
    <>
      <section className="login">
        <section className="login__card">
          <form className="login__form" id="login" action="">
            <h2 className="login__header">Login</h2>
            <section className="login__container">
              <label className="login__label">Email:</label>
              <input
                className="login__input"
                type="text"
                placeholder="email"
                name="login_email"
              />
            </section>
            <section className="login__container">
              <label className="login__label">Password:</label>
              <input
                className="login__input"
                type="password"
                placeholder="password"
                name="login_password"
              />
            </section>
              <button className="login__button" type="submit">
                Login
              </button>
          </form>
        </section>
      </section>
    </>
  );
};

export default LogInPage;
