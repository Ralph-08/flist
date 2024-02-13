import "./OrdersPage.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import Order from "../../components/Order/Order";
import Navbar from "../../components/Navbar/Navbar";

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
    <>
    <Navbar />
    <section className="orders">
      <h1 className="orders__header">Orders</h1>
      <section className="orders__container">
        {ordersList &&
          ordersList.map((order) => <Order order={order} key={order._id} />)}
      </section>
    </section>
    </>
  );
};

export default OrdersPage;
