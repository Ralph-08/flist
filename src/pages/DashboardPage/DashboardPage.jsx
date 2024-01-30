import "./DashboardPage.scss";
import Item from "../../components/Item/Item";

const DashboardPage = () => {


  
  return (
    <>
      <section className="dashboard">
        <h1 className="dashboard__header">Dashboard</h1>

        <h2 className="dashboard__subheader">Weekly List:</h2>
        <section className="dashboard__card">

          <section className="dashboard__container">
            <ul className="subhead__list">
              <li className="subhead__item">
                <p className="subhead__header">Item:</p>
              </li>
              <li className="subhead__item">
                <p className="subhead__header">Price:</p>
              </li>
            </ul>
          </section>

          <Item />
          <Item />
          <Item />
          <Item />
          <Item />


        </section>
      </section>
    </>
  );
};

export default DashboardPage;
