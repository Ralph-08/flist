import "./LogInPage.scss";
import DashboardPage from "../DashboardPage/DashboardPage";
import { Link } from "react-router-dom";

const LogInPage = () => {
  return (
    <section className="login">
      <section className="login__card">
        <form className="login__form" action="">
        <h2 className="login__header">Login</h2>
          <section className="login__container">
            <label className="login__label">Email:</label>
            <input className="login__input" type="text" placeholder="email" />
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
    </section>
  );
};

export default LogInPage;
