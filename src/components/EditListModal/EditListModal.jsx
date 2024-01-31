import "./EditListModal.scss";
import closeIcon from "../../assets/icons/close.png";
import PickDate from "../PickDate/PickDate";
import { useState } from "react";
import Item from "../Item/Item";

const EditListModal = ({ handleClose, setScheduledDate, scheduledDate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // ------------timestamp--------------------
  const dateObject = new Date(selectedDate);
  const timestamp = dateObject.getTime();

  const numberTimestamp = new Date(timestamp);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(numberTimestamp);

  setScheduledDate(`${formattedDate}`);

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
            <Item />
            <Item />
            <Item />
            <Item />
            </section>
            <section className="bottom-list__actions">
              <button className="bottom-list__save">Save Changes</button>
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
