import "./ItemsPage.scss";
import Item from "../../components/Item/Item";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loarder";
import Navbar from "../../components/Navbar/Navbar";
import LoggedOutMessage from "../../components/LoggedOutMessage/LoggedOutMessage";

const ItemsPage = () => {
  const [listItems, setListItems] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);
  const { listId } = useParams();
  const navigate = useNavigate();

  const getItems = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_API_URL + "/items");
      setListItems(res.data);
    } catch (err) {
      console.log("Error getting items: ", err);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return setFailedAuth(true);

    setTimeout(() => {
      getItems();
    }, 1000);
  }, []);

  if (failedAuth) {
    setTimeout(() => {
      navigate("/");
    }, 2000);
    return <LoggedOutMessage />;
  }

  return (
    <>
      <Navbar />
      {listItems ? (
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
            {listItems &&
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
              })}
          </section>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ItemsPage;
