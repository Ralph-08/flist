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
  const [weeklyList, setWeeklyList] = useState(null);

  const handleEditDisplay = () => {
    !editModal ? setEditModal(true) : setEditModal(false);
  };

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await axios.get("http://localhost:8080/lists");
        setWeeklyList(res.data.find((list) => list.weekly_list));
      } catch (err) {
        console.log("Error getting items", err);
      }
    };

    getItems();
  }, []);

  // console.log(weeklyList._id);

  return (
    <section className="weekly">
      <ul className="weekly__list">
        <li className="weekly__item">
          <h2 className="weekly__subheader">Weekly List:</h2>
        </li>
        <li className="weekly__item">
          <a
            href="https://www.amazon.com/gp/aws/cart/add.html?ASIN.1=B013OY25GA&Quantity.1=1&ASIN.2=B01M3RZBFH&Quantity.2=1&ASIN.3=B0025W9A5C&Quantity.3=1&ASIN.4=B000V1JVAI&Quantity.4=1"
            target="_blank"
          >
            <button className="weekly__button">
              <img className="weekly__add-icon" src={addIcon} alt="add-icon" />{" "}
              Add Items
            </button>
          </a>
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
          <h2 className="message-prompt">No Items Added</h2>
        ) : (
          weeklyList.items.map((item, i) => (
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
        {weeklyList && (
          <section className="list-info">
            <ul className="list-info__list">
              <li className="list-info__item">
                <p className="list-info__text">
                  <span className="bold">Scheduled for:</span> {scheduledDate}
                </p>
              </li>
              <li className="list-info__item">
                <p className="list-info__text">
                  <span className="bold">Total:</span> $43.02
                </p>
              </li>
            </ul>
          </section>
        )}
      </section>
      {editModal && (
        <EditListModal
          handleClose={handleEditDisplay}
          scheduledDate={scheduledDate}
          setScheduledDate={setScheduledDate}
          itemsList={weeklyList.items}
        />
      )}
    </section>
  );
};

export default WeeklyList;
