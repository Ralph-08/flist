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
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [weeklyList, setWeeklyList] = useState(null);
  const [scheduledLists, setScheduledLists] = useState(null);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  const AuthToken = sessionStorage.getItem("token");

  const handleEditDisplay = () => {
    !editModal ? setEditModal(true) : setEditModal(false);
  };

  const getScheduledLists = async () => {
    try {
      const res = await axios.get(API_URL + "/lists", {
        headers: {
          Authorization: "Bearer " + AuthToken,
        },
      });
      setIsDataFetched(true);
      setWeeklyList(res.data.find((list) => list.weekly_list === true));
      setScheduledLists(res.data.filter((list) => !list.weekly_list));
    } catch (err) {
      console.log("Error getting scheduled lists: ", err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getScheduledLists();
    }, 1000);
  }, []);

  const handleCreateList = async (isWeeklyList) => {
    try {
      const res = await axios.post(API_URL + "/lists", {
        token: "Bearer " + AuthToken,
        weekly_list: isWeeklyList ? true : false,
      });
      getScheduledLists();
    } catch (err) {
      console.log("Error creating weekly list: ", err);
    }
  };

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

  return (
    <>
      <Navbar />
      {!isDataFetched ? (
        <Loader />
      ) : (
        <section className="dashboard">
          <h1 className="dashboard__header">Dashboard</h1>
          {weeklyList ? (
            <WeeklyList
              handleEditModal={handleEditDisplay}
              AuthToken={AuthToken}
              getItems={getScheduledLists}
              list={weeklyList}
            />
          ) : (
            <section className="new-list__container">
              <h2 className="new-list__header">No weekly list</h2>
              <button
                className="new-list__button"
                onClick={() => handleCreateList(true)}
              >
                Create weekly List
              </button>
            </section>
          )}
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
      )}
    </>
  );
};

export default DashboardPage;
