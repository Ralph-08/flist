import "./OrdersPage.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import Item from "../../components/Item/Item";

const OrdersPage = () => {
  const [ordersList, setOrdersList] = useState(null);

  const getOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8080/orders");
      setOrdersList(res.data);
    } catch (err) {
      console.log("Error getting orders: ", err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <section className="orders">
      <h1 className="orders__header">Orders</h1>
      <section className="orders__container">
        {ordersList &&
          ordersList.map((order) => (
            <section className="order__card">
              <h2 className="order_subheader">
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(order.order_date)}
              </h2>
              <section className="order__items-container">
                {order.items.map((item) => (
                  <Item
                    img={item.image}
                    title={item.title}
                    price={item.price}
                  />
                ))}
              </section>
            </section>
          ))}
      </section>
    </section>
  );
};

export default OrdersPage;
