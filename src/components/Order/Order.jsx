import Item from "../../components/Item/Item";
import "./Order.scss";

const Order = ({ order }) => {
  return (
    <section className="order__card">
      <h2 className="order__subheader">
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
            key={item._id}
          />
        ))}
      </section>
    </section>
  );
};

export default Order;
