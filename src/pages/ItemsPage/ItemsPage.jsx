import "./ItemsPage.scss";
import Item from "../../components/Item/Item";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ItemsPage = () => {
  const [listItems, setListItems] = useState(null);

  const { listId } = useParams();

  const getItems = async () => {
    try {
      const res = await axios.get("http://localhost:8080/items");
      setListItems(res.data);
    } catch (err) {
      console.log("Error getting items: ", err);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <section className="items">
      <section className="items__top-list">
        <Link to="/dashboard" className="items__top-link">
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/sf-black/64/left.png"
            alt="left"
          />
          Back
        </Link>
        <h1 className="items__header">
          {listId ? "Add To List" : "Items Catalog"}
        </h1>
        <p></p>
      </section>
      <section className="items__card-container">
        {!listItems ? (
          <h3 className="items__prompt-text">Loading...</h3>
        ) : (
          listItems.map((item) => {
            return (
              <Item
                img={item.image}
                price={item.price}
                title={item.title}
                rating={item.rating}
                ratings_total={item.ratings_total}
                asin={item.asin}
                key={item.asin}
                link={item.link}
                listId={listId}
                item={item}
              />
            );
          })
        )}
      </section>
    </section>
  );
};

export default ItemsPage;
