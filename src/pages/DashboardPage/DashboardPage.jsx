import "./DashboardPage.scss";
import ScheduledList from "../../components/ScheduledList/ScheduledList";
import WeeklyList from "../../components/WeeklyList/WeeklyList";

const DashboardPage = () => {
  return (
    <>
      <section className="dashboard">
        <h1 className="dashboard__header">Dashboard</h1>

        <WeeklyList />
        <ScheduledList />
      </section>
    </>
  );
};

export default DashboardPage;
