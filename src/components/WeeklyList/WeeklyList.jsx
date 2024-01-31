import "./WeeklyList.scss";
import Item from "../Item/Item";
import addIcon from "../../assets/icons/add-svgrepo-com (1).svg";
import editIcon from "../../assets/icons/edit-pencil.svg";

const WeeklyList = () => {
  return (
    <>
      <ul className="dashboard__list">
        <li className="dashboard__item">
          <h2 className="dashboard__subheader">Weekly List:</h2>
        </li>
        <li className="dashboard__item">
          <button className="dashboard__button">
            <img className="dashboard__add-icon" src={addIcon} alt="add-icon" />{" "}
            Add Items
          </button>
          <button className="dashboard__button dashboard__button--secondary">
            <img className="dashboard__add-icon" src={editIcon} alt="" />
            Edit
          </button>
        </li>
      </ul>
      <section className="dashboard__card">
        <section className="dashboard__container">
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
              <span className="bold">Scheduled for:</span> Friday, Feb 2
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
    </>
  );
};

export default WeeklyList;
