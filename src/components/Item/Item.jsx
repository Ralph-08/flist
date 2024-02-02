import "./Item.scss";

export default function Item({
  img,
  price,
  title,
  rating,
  ratings_total,
  asin,
  link,
}) {
  return (
    <section className="dashboard__container items__card">
      <section className="items__container">
        <img className="items__img" src={img} alt="product-img" />
        <ul className="items__list">
          <li className="items__item">
            <h3 className="items__subheader">{title}</h3>
            <p className="items__text">Ratings: {rating}/5</p>
            {ratings_total && (
              <p className="items__rated">{ratings_total} Rated</p>
            )}
            {link ? (
              <p>
                <a className="items__link" href={link}>View on Amazon</a>
              </p>
            ) : (
              <p className="items__text">Quantity: 1</p>
            )}
          </li>
        </ul>
      </section>
      <p className="item__price">{"$" + price}</p>
    </section>
  );
}
