import Item from "../Item/Item";
import addIcon from "../../assets/icons/add-svgrepo-com (1).svg";
import editIcon from "../../assets/icons/edit-pencil.svg";
import "./ScheduledList.scss";

const ScheduledList = () => {
  return (
    <section className="scheduled">
      <ul className="scheduled__list">
        <li className="scheduled__item">
          <h2 className="scheduled__subheader">Scheduled List:</h2>
        </li>
        <li className="scheduled__item">
          <button className="scheduled__button scheduled__button--secondary">
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

        <Item />
        <Item />
        <section className="list-info">
          <ul className="list-info__list">
            <li className="list-info__item">
              <p className="list-info__text">
                <span className="bold">Scheduled for:</span> Every two weeks
              </p>
              <p className="list-info__text">
                <span className="bold">Next order due:</span> Friday, Feb 2
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
    </section>
  );
};

export default ScheduledList;
