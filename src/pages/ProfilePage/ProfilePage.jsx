import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./ProfilePage.scss";
import { useNavigate } from "react-router-dom";
import LoggedOutMessage from "../../components/LoggedOutMessage/LoggedOutMessage";

const ProfilePage = () => {
  const [failedAuth, setFailedAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return setFailedAuth(true);
  }, []);

  if (failedAuth) {
    setTimeout(() => {
      navigate("/");
    }, 2000);
    return <LoggedOutMessage />;
  }

  return (
    <>
      <Navbar />
      <section className="profile">
        <h1 className="profile__header">Profile</h1>
      </section>
    </>
  );
};

export default ProfilePage;
