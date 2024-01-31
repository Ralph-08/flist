import "./EditListModal.scss";
import closeIcon from "../../assets/icons/close.png";
import PickDate from "../PickDate/PickDate";
import { useState } from "react";

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
            <h1>Weekly List Scheduled For: {` ${scheduledDate}`}</h1>
          </li>
          <li className="top-list__btn" onClick={handleClose}>
            <img className="top-list__close" src={closeIcon} alt="close-icon" />
          </li>
        </ul>
        <PickDate
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
        />
      </section>
    </section>
  );
};

export default EditListModal;
