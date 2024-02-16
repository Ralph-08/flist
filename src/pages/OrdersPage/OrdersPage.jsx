import "./OrdersPage.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import Order from "../../components/Order/Order";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import LoggedOutMessage from "../../components/LoggedOutMessage/LoggedOutMessage";

const OrdersPage = () => {
  const [ordersList, setOrdersList] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);
  const navigate = useNavigate();

  const getOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8080/orders", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      setOrdersList(res.data);
    } catch (err) {
      console.log("Error getting orders: ", err);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return setFailedAuth(true);
    getOrders();
  }, []);

  if (failedAuth) {
    setTimeout(() => {
      navigate("/");
    }, 2000);
    return <LoggedOutMessage />;
  }

  // console.log(ordersList.length);

  return (
    <>
      <Navbar />
      <section className="orders">
        <h1 className="orders__header">Orders</h1>
        {ordersList?.length === 0 ? (
          <h2 className="orders__message">No past orders</h2>
        ) : (
          <section className="orders__container">
            {ordersList &&
              ordersList.map((order) => (
                <Order order={order} key={order._id} />
              ))}
          </section>
        )}
      </section>
    </>
  );
};

export default OrdersPage;
