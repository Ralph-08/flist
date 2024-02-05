import "./DashboardPage.scss";
import ScheduledList from "../../components/ScheduledList/ScheduledList";
import WeeklyList from "../../components/WeeklyList/WeeklyList";
import { useState, useEffect } from "react";
import axios from "axios";

const DashboardPage = () => {
  const [editModal, setEditModal] = useState(false);
  const [scheduledLists, setScheduledLists] = useState(null);

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
    getScheduledLists();
  }, []);

  return (
    <>
      <section className="dashboard">
        <h1 className="dashboard__header">Dashboard</h1>
        <WeeklyList handleEditModal={handleEditDisplay} />
        {scheduledLists &&
          scheduledLists.map((list) => <ScheduledList items={list.items} />)}
      </section>
    </>
  );
};

export default DashboardPage;
