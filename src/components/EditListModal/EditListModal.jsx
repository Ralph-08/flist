import "./EditListModal.scss";
import closeIcon from "../../assets/icons/close.png";
import PickDate from "../PickDate/PickDate";
import { useState } from "react";
import Item from "../Item/Item";
import axios from "axios";
import trashcanIcon from "../../assets/icons/icon-trash.svg";

const EditListModal = ({
  handleClose,
  setScheduledDate,
  scheduledDate,
  itemsList,
  listId,
  getItems,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dateObject = new Date(selectedDate);
  const timestamp = dateObject.getTime();
  const numberTimestamp = new Date(timestamp);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(numberTimestamp);

  setScheduledDate(`${formattedDate}`);

  let ItemIds = [];

  const getItemIds = (id) => {
    ItemIds = [...ItemIds, id];
    console.log(id);
  };

  const deleteItems = async () => {
    try {
      const res = await axios.put(
        process.env.REACT_APP_URL + "/lists/" + listId,
        ItemIds
      );
    } catch (err) {
      console.log("Error deleting items from list: ", err);
    }
    getItems();
    handleClose();
  };

  return (
    <section className="edit">
      <section className="edit__card">
        <ul className="top-list">
          <li className="top-list__item">
            <h2>Weekly List Scheduled For: {` ${scheduledDate}`}</h2>
          </li>
          <li className="top-list__btn" onClick={handleClose}>
            <img className="top-list__close" src={closeIcon} alt="close-icon" />
          </li>
        </ul>
        <ul className="main-list">
          <li className="main-list__item">
            <p className="main-list__text">Scheduled Date:</p>
            <PickDate
              setSelectedDate={setSelectedDate}
              selectedDate={selectedDate}
            />
          </li>
          <li className="bottom-list__item">
            <section className="bottom-list__items-container">
              {!itemsList ? (
                <p>Loading</p>
              ) : (
                itemsList.map((item) => (
                  <Item
                    img={item.image}
                    price={item.price}
                    title={item.title}
                    rating={item.rating}
                    ratings_total={item.ratings_total}
                    asin={item.asin}
                    key={item.asin}
                    itemId={item._id}
                    getItemIds={getItemIds}
                    trashcanIcon={trashcanIcon}
                    quantity={item.quantity}
                  />
                ))
              )}
            </section>
            <section className="bottom-list__actions">
              <button onClick={deleteItems} className="bottom-list__save">
                Save Changes
              </button>
              <button className="bottom-list__cancel" onClick={handleClose}>
                Cancel
              </button>
            </section>
          </li>
        </ul>
      </section>
    </section>
  );
};

export default EditListModal;
