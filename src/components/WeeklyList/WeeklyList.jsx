import "./WeeklyList.scss";
import Item from "../Item/Item";
import addIcon from "../../assets/icons/add-svgrepo-com (1).svg";
import editIcon from "../../assets/icons/edit-pencil.svg";
import { useState } from "react";
import EditListModal from "../EditListModal/EditListModal";
import axios from "axios";
import { Link } from "react-router-dom";
import ClearListModal from "../ClearListModal/ClearListModal";
import MessagePromptModal from "../MessagePromptModal/MessagePromptModal";
import Loader from "../Loader/Loarder";

const WeeklyList = ({ AuthToken, list, getItems }) => {
  const [editModal, setEditModal] = useState(false);
  const [scheduledDate, setScheduledDate] = useState(null);
  const [clearList, setClearList] = useState(false);
  const [promptModal, setPromptModal] = useState(false);

  const handleEditDisplay = () => {
    !editModal ? setEditModal(true) : setEditModal(false);
  };

  const postToOrders = async () => {
    try {
      const res = await axios.post("http://localhost:8080/orders", {
        data: {
          token: "Bearer " + AuthToken,
          list: list,
        },
      });
    } catch (err) {
      console.log("Error posting order: ", err);
    }
  };

  const clearAllListItems = async () => {
    try {
      const res = await axios.delete(`http://localhost:8080/lists/${list._id}`);
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
    setPromptModal("You list was added to your orders page");
    setTimeout(() => setPromptModal(false), 5500);
  };

  let amazonUrl;
  let cartUrl = [];

  const handleDynamicUrl = (item, i) => {
    const url = `ASIN.${i + 1}=${item.asin}&Quantity.${i + 1}=${item.quantity}`;
    if (list.items.length !== i + 1) {
      cartUrl.push(url + "&");
    } else {
      cartUrl.push(url);
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
          {list && (
            <Link to={`/items/${list._id}`}>
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
          {list.items.length === 0 ? (
            ""
          ) : (
            <button
              onClick={handleEditDisplay}
              className="weekly__button weekly__button--secondary"
            >
              <img
                className="weekly__add-icon"
                src={editIcon}
                alt="edit-icon"
              />
              Edit
            </button>
          )}
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
        {!list ? (
          <Loader />
        ) : (
          list.items.map((item, i) => {
            handleDynamicUrl(item, i);
            return (
              <Item
                img={item.image}
                price={item.price}
                title={item.title}
                rating={item.rating}
                asin={item.asin}
                quantity={item.quantity}
                key={item.asin}
                itemId={item._id}
                index={i}
              />
            );
          })
        )}
        <section className="list-info">
          <ul className="list-info__list">
            <li
              className={`list-info__item ${
                list?.items.length === 0 ? "list-info__item--container" : ""
              }`}
            >
              {list?.items.length === 0 ? (
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
          itemsList={list.items}
          listId={list._id}
          getItems={getItems}
        />
      )}
      {clearList && (
        <ClearListModal
          handleClearList={handleClearList}
          sendClearList={sendClearList}
        />
      )}
      {promptModal && <MessagePromptModal text={promptModal} />}
    </section>
  );
};

export default WeeklyList;
