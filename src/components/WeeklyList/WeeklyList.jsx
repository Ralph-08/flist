import "./WeeklyList.scss";
import Item from "../Item/Item";
import addIcon from "../../assets/icons/add-svgrepo-com (1).svg";
import editIcon from "../../assets/icons/edit-pencil.svg";
import { useState, useEffect } from "react";
import EditListModal from "../EditListModal/EditListModal";
import axios from "axios";
import { Link } from "react-router-dom";
import ClearListModal from "../ClearListModal/ClearListModal";
import MessagePromptModal from "../MessagePromptModal/MessagePromptModal";
import Loader from "../Loader/Loarder";

const WeeklyList = () => {
  const [editModal, setEditModal] = useState(false);
  const [scheduledDate, setScheduledDate] = useState(null);
  const [weeklyList, setWeeklyList] = useState(null);
  const [clearList, setClearList] = useState(false);
  const [promptModal, setPromptModal] = useState(false);

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
    setTimeout(() => {
      getItems();
    }, 1000);
  }, []);

  const postToOrders = async () => {};

  const clearAllListItems = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/lists/${weeklyList._id}`
      );
      getItems();
    } catch (err) {
      console.log("Error clearing items", err);
    }
  };

  const handleClearList = () => {
    !clearList ? setClearList(true) : setClearList(false);
  };

  const sendClearList = () => {
    clearAllListItems();
    postToOrders();
    handleClearList();
    setPromptModal(true);
    setTimeout(() => setPromptModal(false), 5500);
  };

  let amazonUrl;
  let cartUrl = [];

  const handleDynamicUrl = (item, i) => {
    if (weeklyList.items.length !== i + 1) {
      cartUrl.push(`ASIN.${i + 1}=${item.asin}&Quantity.${i + 1}=1&`);
    } else {
      cartUrl.push(`ASIN.${i + 1}=${item.asin}&Quantity.${i + 1}=1`);
      amazonUrl = cartUrl.join("");
    }
  };

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
          <Loader />
        ) : (
          weeklyList.items.map((item, i) => {
            handleDynamicUrl(item, i);
            return (
              <Item
                img={item.image}
                price={item.price}
                title={item.title}
                rating={item.rating}
                asin={item.asin}
                key={item.asin}
                itemId={item._id}
              />
            );
          })
        )}
        <section className="list-info">
          <ul className="list-info__list">
            <li
              className={`list-info__item ${
                weeklyList?.items.length === 0
                  ? "list-info__item--container"
                  : ""
              }`}
            >
              {weeklyList?.items.length === 0 ? (
                <p className="list-info__empty-message">No items added</p>
              ) : (
                <a
                  onClick={handleClearList}
                  href={`https://www.amazon.com/gp/aws/cart/add.html?${amazonUrl}`}
                  target="_blank"
                >
                  <button className="list-info__btn">Check out</button>
                </a>
              )}
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
      {clearList && (
        <ClearListModal
          handleClearList={handleClearList}
          sendClearList={sendClearList}
        />
      )}
      {promptModal && <MessagePromptModal />}
    </section>
  );
};

export default WeeklyList;
