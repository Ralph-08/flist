import { useState } from "react";
import "./Item.scss";
import axios from "axios";

export default function Item({
  img,
  price,
  title,
  rating,
  ratings_total,
  asin,
  link,
  countTotal,
  listId,
  item,
  itemId,
  getItemIds,
  trashcanIcon,
}) {
  const [isAdded, setIsAdded] = useState(false);
  const [deleteView, setDeleteView] = useState(false);

  const handleAddedStatus = () => {
    !isAdded ? setIsAdded(true) : setIsAdded(false);
  };

  const addItem = async (item) => {
    handleAddedStatus();
    try {
      const res = await axios.patch(
        `http://localhost:8080/lists/${listId}`,
        item
      );
    } catch (err) {
      console.log("Error adding item to list: ", err);
    }
  };

  const handleDelete = () => {
    getItemIds(itemId);
    if (!deleteView) {
      setDeleteView(true);
    }
  };

  return (
    <section
      className={`dashboard__container items__card ${
        deleteView ? "items__card--disabled" : ""
      }`}
    >
      <section className="items__container">
        <img className="items__img" src={img} alt="product-img" />
        <ul className="items__list">
          <li className="items__item">
            <h3 className="items__subheader">{title}</h3>
            {ratings_total && <p className="items__text">Ratings: {rating}/5</p>}
            {ratings_total && (
              <p className="items__rated">{ratings_total} Rated</p>
            )}
            {link ? (
              <p>
                <a className="items__link" href={link} target="_blank">
                  View on Amazon
                </a>
              </p>
            ) : (
              <p className="items__text">Quantity: 1</p>
            )}
          </li>
        </ul>
      </section>
      <section className="items__list-right">
        <p className="item__price">{"$" + price}</p>
        {listId && (
          <button
            onClick={() => addItem(item)}
            className={`items__add-btn ${
              isAdded ? `items__add-btn--added` : ""
            }`}
          >
            {!isAdded ? "Add +" : "Added"}
          </button>
        )}
        {trashcanIcon && (
          <button
            disabled={deleteView}
            onClick={handleDelete}
            className={`items__delete-btn ${
              deleteView ? "items__delete-btn--disabled" : ""
            }`}
          >
            <img className="items__delete-icon" src={trashcanIcon} />
          </button>
        )}
      </section>
    </section>
  );
}
