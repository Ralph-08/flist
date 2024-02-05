import "./WeeklyList.scss";
import Item from "../Item/Item";
import addIcon from "../../assets/icons/add-svgrepo-com (1).svg";
import editIcon from "../../assets/icons/edit-pencil.svg";
import { useState, useEffect } from "react";
import EditListModal from "../EditListModal/EditListModal";
import axios from "axios";
import { Link } from "react-router-dom";

const WeeklyList = () => {
  const [editModal, setEditModal] = useState(false);
  const [scheduledDate, setScheduledDate] = useState(null);
  const [weeklyList, setWeeklyList] = useState(null);

  const handleEditDisplay = () => {
    !editModal ? setEditModal(true) : setEditModal(false);
  };

  const getItems = async () => {
    try {
      const res = await axios.get("http://localhost:8080/lists");
      setWeeklyList(res.data.find((list) => list.weekly_list));
    } catch (err) {
      console.log("Error getting items", err);
    }
  };
  useEffect(() => {
    getItems();
  }, []);

  return (
    <section className="weekly">
      <ul className="weekly__list">
        <li className="weekly__item">
          <h2 className="weekly__subheader">Weekly List:</h2>
        </li>
        <li className="weekly__item">
          {weeklyList?._id && (
            <Link to={`/items/${weeklyList._id}`}>
              <button className="weekly__button">
                <img
                  className="weekly__add-icon"
                  src={addIcon}
                  alt="add-icon"
                />{" "}
                Add Items
              </button>
            </Link>
          )}
          <button
            onClick={handleEditDisplay}
            className="weekly__button weekly__button--secondary"
          >
            <img className="weekly__add-icon" src={editIcon} alt="edit-icon" />
            Edit
          </button>
        </li>
      </ul>
      <section className="weekly__card">
        <section className="weekly__container">
          <ul className="subhead__list">
            <li className="subhead__item">
              <p className="subhead__header">Item:</p>
            </li>
            <li className="subhead__item">
              <p className="subhead__header">Price:</p>
            </li>
          </ul>
        </section>
        {!weeklyList ? (
          <p>Loading..</p>
        ) : (
          weeklyList.items.map((item) => (
            <Item
              img={item.image}
              price={item.price}
              title={item.title}
              rating={item.rating}
              asin={item.asin}
              key={item.asin}
              itemId={item._id}
            />
          ))
        )}
        <section className="list-info">
          <ul className="list-info__list">
            <li className="list-info__item">
              <p className="list-info__text">
                <span className="bold">Scheduled for:</span> {scheduledDate}
              </p>
            </li>
            <li className="list-info__item">
              <p className="list-info__text">
                <span className="bold"></span>
              </p>
            </li>
          </ul>
        </section>
      </section>
      {editModal && (
        <EditListModal
          handleClose={handleEditDisplay}
          scheduledDate={scheduledDate}
          setScheduledDate={setScheduledDate}
          itemsList={weeklyList.items}
          listId={weeklyList._id}
          getItems={getItems}
        />
      )}
    </section>
  );
};

export default WeeklyList;
