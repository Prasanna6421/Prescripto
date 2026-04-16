import React, { useEffect, useState } from 'react';
import '../styles_/Calender.css';

const getWeekDays = (baseDate = new Date()) => {
  const days = [];
  const date = new Date(baseDate);
  const dayOfWeek = date.getDay();
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  date.setDate(date.getDate() + diffToMonday);

  while (days.length < 5) {
    const temp = new Date(date);
    days.push({
      date: temp.getDate(),
      fullDate: new Date(temp),
      dayName: temp.toLocaleDateString("en-US", { weekday: "short" }),
      month: temp.toLocaleDateString("en-US", { month: "short" }),
      year: temp.getFullYear(),
    });
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const Calendar = ({ onDateSelect, selectedDate }) => {
  const [weekDays, setWeekDays] = useState([]);

  useEffect(() => {
    setWeekDays(getWeekDays());
  }, []);

  const handleDateClick = (day) => {
    const today = new Date();
    const checkDate = new Date(day.fullDate);
    checkDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (checkDate >= today) {
      onDateSelect(day);
    }
  };

  return (
    <div className="booking-container">
      <h3>Booking slots</h3>
      <div className="days-row">
        {weekDays.map((day, index) => {
          const today = new Date();
          const checkDate = new Date(day.fullDate);
          checkDate.setHours(0, 0, 0, 0);
          today.setHours(0, 0, 0, 0);
          const isPast = checkDate < today;
          const isSelected = selectedDate?.date === day.date && selectedDate?.month === day.month;

          return (
            <div
              key={index}
              className={`day-card ${isPast ? "disabled" : ""} ${isSelected ? "active" : ""}`}              onClick={() => !isPast && handleDateClick(day)}
            >
              <div className="day-name">{day.dayName}</div>
              <div className="day-date">{day.date}</div>
              <div className="day-month">{day.month}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;