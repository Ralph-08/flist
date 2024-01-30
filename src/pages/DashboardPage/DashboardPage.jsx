import "./DashboardPage.scss";

import WeeklyList from "../../components/WeeklyList/WeeklyList";

const DashboardPage = () => {
  return (
    <>
      <section className="dashboard">
        <h1 className="dashboard__header">Dashboard</h1>

        <WeeklyList />
        <WeeklyList />
      </section>
    </>
  );
};

export default DashboardPage;
