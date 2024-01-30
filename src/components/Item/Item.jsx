

export default function Item({ item, imgSrc}) {
  return (
    <section className="dashboard__container items__card">
      <section className="items__container">
        <img
          className="items__img"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9HNcOUzoo6o5IiycQ2xAcy_-8PZvo3YLz-mTwctekqwzRL9Swq31JDfOVg3osET2a2Uo&usqp=CAU"
          alt="product-img"
        />
        <ul className="items__list">
          <li className="items__item">
            <h3 className="items__text">
              Organic Valley, Organic Whole Milk, 64 Oz (Half Gallon)
            </h3>
            <p className="items__text">Reviews: 4.3/5</p>
            <p className="items__text">Quantity: 1</p>
          </li>
        </ul>
      </section>

      <p>$3.29</p>
    </section>
  );
}
