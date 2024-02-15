import "./DashboardPage.scss";
import ScheduledList from "../../components/ScheduledList/ScheduledList";
import WeeklyList from "../../components/WeeklyList/WeeklyList";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import LoggedOutMessage from "../../components/LoggedOutMessage/LoggedOutMessage";
import Loader from "../../components/Loader/Loarder";

const DashboardPage = () => {
  const [editModal, setEditModal] = useState(false);
  const [weeklyList, setWeeklyList] = useState(null);
  const [scheduledLists, setScheduledLists] = useState([]);
  const navigate = useNavigate();
  const AuthToken = sessionStorage.getItem("token");

  const handleEditDisplay = () => {
    !editModal ? setEditModal(true) : setEditModal(false);
  };

  const getScheduledLists = async () => {
    try {
      const res = await axios.get("http://localhost:8080/lists", {
        headers: {
          Authorization: "Bearer " + AuthToken,
        },
      });
      setWeeklyList(res.data.find((list) => list.weekly_list === true));
      setScheduledLists(res.data.filter((list) => !list.weekly_list));
    } catch (err) {
      console.log("Error getting scheduled lists: ", err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getScheduledLists();
    }, 2000)
  }, []);

  let ItemIds = [];

  const getItemIds = (id) => {
    ItemIds = [...ItemIds, id];
    console.log(id);
  };

  if (!AuthToken) {
    setTimeout(() => {
      navigate("/");
    }, 2000);
    return <LoggedOutMessage />;
  }

  if (!weeklyList) return <Loader />;

  return (
    <>
      <Navbar />
      <section className="dashboard">
        <h1 className="dashboard__header">Dashboard</h1>
        <WeeklyList
          handleEditModal={handleEditDisplay}
          AuthToken={AuthToken}
          getItems={getScheduledLists}
          list={weeklyList}
        />
        {scheduledLists &&
          scheduledLists.map((list) => (
            <ScheduledList
              items={list.items}
              listId={list._id}
              key={list._id}
              getItems={getScheduledLists}
            />
          ))}
      </section>
    </>
  );
};

export default DashboardPage;
