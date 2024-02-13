import Loader from "../Loader/Loarder";
import "./LoggedOutMessage.scss";

const LoggedOutMessage = () => {
  return (
    <section className="auth">
      <section className="auth__container">
        <h2 className="auth__text">You have been logged out</h2>
        <h4 className="auth__text">Redirecting...</h4>
        <Loader />
      </section>
    </section>
  );
};

export default LoggedOutMessage;
