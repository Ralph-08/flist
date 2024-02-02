import "./ItemsPage.scss";
import Item from "../../components/Item/Item";
import axios from "axios";
import { useState, useEffect } from "react";

const ItemsPage = () => {
  const [listItems, setListItems] = useState(null);

  const getItems = async () => {
    try {
      const res = await axios.get("http://localhost:8080/items");
      console.log(res.data);
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
      <h1 className="items__header">Items</h1>
      <section className="items__card-container">
        {!listItems ? (
          <p>Loading...</p>
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
              />
            );
          })
        )}
      </section>
    </section>
  );
};

export default ItemsPage;
