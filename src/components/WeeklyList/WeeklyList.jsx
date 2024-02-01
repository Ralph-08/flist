import "./WeeklyList.scss";
import Item from "../Item/Item";
import addIcon from "../../assets/icons/add-svgrepo-com (1).svg";
import editIcon from "../../assets/icons/edit-pencil.svg";
import { useState, useEffect } from "react";
import EditListModal from "../EditListModal/EditListModal";
import axios from "axios";

const WeeklyList = () => {
  const [editModal, setEditModal] = useState(false);
  const [scheduledDate, setScheduledDate] = useState(null);
  const [itemsList, setItemsList] = useState(null);

  const handleEditDisplay = () => {
    !editModal ? setEditModal(true) : setEditModal(false);
  };

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await axios.get("http://localhost:8080");
        setItemsList(res.data);
      } catch (err) {
        console.log("Error getting items", err);
      }
    };

    getItems();
  }, []);

  return (
    <section className="weekly">
      <ul className="weekly__list">
        <li className="weekly__item">
          <h2 className="weekly__subheader">Weekly List:</h2>
        </li>
        <li className="weekly__item">
          <button className="weekly__button">
            <img className="weekly__add-icon" src={addIcon} alt="add-icon" />{" "}
            Add Items
          </button>
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
        {!itemsList ? (
          <p>Loading..</p>
        ) : (
          itemsList.map((item, i) => (
            <Item
              img={item.image}
              price={item.price}
              title={item.title}
              rating={item.rating}
              asin={item.asin}
              key={item.asin}
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
                <span className="bold">Total:</span> $25.78
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
        />
      )}
    </section>
  );
};

export default WeeklyList;
