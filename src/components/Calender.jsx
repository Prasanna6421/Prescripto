import React, { useEffect, useState } from "react";
import "../styles_/Calender.css";

const getNextSevenWorkingDays = () => {
  const days = [];
  const date = new Date();

  date.setHours(0, 0, 0, 0);

  while (days.length < 7) {
    if (date.getDay() !== 0) {
      days.push({
        date: date.getDate(),
        month: date.toLocaleDateString("en-US", {
          month: "short",
        }),
        year: date.getFullYear(),
        dayName: date.toLocaleDateString("en-US", {
          weekday: "short",
        }),
        fullDate: new Date(date),
      });
    }

    date.setDate(date.getDate() + 1);
  }

  return days;
};

const Calendar = ({ onDateSelect, selectedDate }) => {
  const [weekDays, setWeekDays] = useState([]);

  useEffect(() => {
    setWeekDays(getNextSevenWorkingDays());
  }, []);

  const handleDateClick = (day) => {
    const today = new Date();
    const selected = new Date(day.fullDate);

    today.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);

    if (selected >= today) {
      onDateSelect(day);
    }
  };

  return (
    <div className="booking-container">
      <h3>Booking slots</h3>

      <div className="days-row">
        {weekDays.map((day) => {
          const today = new Date();
          const selected = new Date(day.fullDate);

          today.setHours(0, 0, 0, 0);
          selected.setHours(0, 0, 0, 0);

          const isPast = selected < today;

          const isSelected =
            selectedDate?.date === day.date &&
            selectedDate?.month === day.month &&
            selectedDate?.year === day.year;

          return (
            <div
              key={`${day.year}-${day.date}-${day.month}`}
              className={`day-card ${
                isPast ? "disabled" : ""
              } ${isSelected ? "active" : ""}`}
              onClick={() => {
                if (!isPast) {
                  handleDateClick(day);
                }
              }}
            >
              <div className="day-name">
                {day.dayName}
              </div>

              <div className="day-date">
                {day.date}
              </div>

              <div className="day-month">
                {day.month}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;