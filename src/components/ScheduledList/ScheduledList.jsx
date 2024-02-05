import Item from "../Item/Item";
import editIcon from "../../assets/icons/edit-pencil.svg";
import "./ScheduledList.scss";
import EditListModal from "../EditListModal/EditListModal";
import { useState } from "react";

const ScheduledList = ({ items }) => {
  const [editModal, setEditModal] = useState(false);
  const [scheduledDate, setScheduledDate] = useState(null);

  const handleEditDisplay = () => {
    !editModal ? setEditModal(true) : setEditModal(false);
  };

  return (
    <section className="scheduled">
      <ul className="scheduled__list">
        <li className="scheduled__item">
          <h2 className="scheduled__subheader">Scheduled List:</h2>
        </li>
        <li className="scheduled__item">
          <button
            onClick={handleEditDisplay}
            className="scheduled__button scheduled__button--secondary"
          >
            <img className="scheduled__add-icon" src={editIcon} alt="" />
            Edit
          </button>
        </li>
      </ul>
      <section className="scheduled__card">
        <section className="scheduled__container">
          <ul className="subhead__list">
            <li className="subhead__item">
              <p className="subhead__header">Item:</p>
            </li>
            <li className="subhead__item">
              <p className="subhead__header">Price:</p>
            </li>
          </ul>
        </section>
        {!items ? (
          <h3>Loading...</h3>
        ) : (
          items.map((item) => {
            return (
              <Item
                img={item.image}
                price={item.price}
                title={item.title}
                rating={item.rating}
                asin={item.asin}
                key={item.asin}
              />
            );
          })
        )}
        <section className="list-info">
          <ul className="list-info__list">
            <li className="list-info__item">
              <p className="list-info__text">
                <span className="bold">Scheduled for:</span> Every two Fridays
              </p>
              <p className="list-info__text">
                <span className="bold">Next order due:</span> Friday, Feb 16
              </p>
            </li>
            <li className="list-info__item">
              <p className="list-info__text">
                <span className="bold">Total:</span> $7.99
              </p>
            </li>
          </ul>
        </section>
        {editModal && (
          <EditListModal
            handleClose={handleEditDisplay}
            scheduledDate={scheduledDate}
            setScheduledDate={setScheduledDate}
            itemsList={items}
          />
        )}
      </section>
    </section>
  );
};

export default ScheduledList;
