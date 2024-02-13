import "./DashboardPage.scss";
import ScheduledList from "../../components/ScheduledList/ScheduledList";
import WeeklyList from "../../components/WeeklyList/WeeklyList";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";

const DashboardPage = () => {
  const [editModal, setEditModal] = useState(false);
  const [scheduledLists, setScheduledLists] = useState(null);

  const [failedAuth, setFailedAuth] = useState(false);

  const handleEditDisplay = () => {
    !editModal ? setEditModal(true) : setEditModal(false);
  };

  const getScheduledLists = async () => {
    try {
      const res = await axios.get("http://localhost:8080/lists");
      setScheduledLists(res.data.filter((list) => !list.weekly_list));
    } catch (err) {
      console.log("Error getting scheduled lists: ", err);
    }
  };

  useEffect(() => {

    const token = sessionStorage.getItem("token");

    // if (!token) console.log("Not")

    console.log(token);

    getScheduledLists();
  }, []);

  let ItemIds = [];

  const getItemIds = (id) => {
    ItemIds = [...ItemIds, id];
    console.log(id);
  };

  return (
    <>
    <Navbar />
      <section className="dashboard">
        <h1 className="dashboard__header">Dashboard</h1>
        <WeeklyList handleEditModal={handleEditDisplay} />
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
