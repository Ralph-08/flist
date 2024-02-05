import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PickDate = ({ selectedDate, setSelectedDate }) => {
  return (
    <DatePicker
      showIcon
      toggleCalendarOnIconClick
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
    />
  );
};
export default PickDate;
