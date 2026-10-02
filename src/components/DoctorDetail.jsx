import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { useParams, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import "../styles_/DoctorDetails.css";
import Calendar from "./Calender";

const DoctorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState("");
  const [now, setNow] = useState(new Date());
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/doctors/${id}`
        );

        if (!response.ok) {
          throw new Error("Doctor not found");
        }

        const data = await response.json();
        setDoctor(data);
      } catch (error) {
        console.error("Error fetching doctor:", error);
        setError("Unable to load doctor details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  const timeSlots = [
    "11:30 AM",
    "1:30 PM",
    "4:30 PM",
    "7:30 PM",
  ];

  useEffect(() => {
    if (!selectedDate || !doctor) {
      setBookedSlots([]);
      return;
    }

    const fetchBookedSlots = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/appointments/doctor/${doctor._id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch booked slots");
        }

        const data = await response.json();

        const selectedDateString = `${selectedDate.date} ${selectedDate.month} ${selectedDate.year}`;

        const slots = Array.isArray(data)
          ? data
              .filter(
                (appointment) =>
                  appointment.date === selectedDateString
              )
              .map((appointment) => appointment.time)
          : [];

        setBookedSlots(slots);

        if (selectedTime && slots.includes(selectedTime)) {
          setSelectedTime(null);
        }
      } catch (error) {
        console.error("Booked slots error:", error);
      }
    };

    fetchBookedSlots();

    const interval = setInterval(fetchBookedSlots, 3000);

    return () => clearInterval(interval);
  }, [selectedDate, doctor, selectedTime]);

  const isToday = () => {
    if (!selectedDate) {
      return false;
    }

    const selected = new Date(
      selectedDate.year,
      new Date(
        `${selectedDate.month} 1, ${selectedDate.year}`
      ).getMonth(),
      selectedDate.date
    );

    return (
      selected.getFullYear() === now.getFullYear() &&
      selected.getMonth() === now.getMonth() &&
      selected.getDate() === now.getDate()
    );
  };

  const isTimePassed = (time) => {
    if (!selectedDate) {
      return false;
    }

    if (!isToday()) {
      return false;
    }

    const [timePart, period] = time.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);

    if (period === "PM" && hours !== 12) {
      hours += 12;
    }

    if (period === "AM" && hours === 12) {
      hours = 0;
    }

    const slotTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes,
      0,
      0
    );

    return slotTime <= now;
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => {
    if (isTimePassed(time)) {
      return;
    }

    if (bookedSlots.includes(time)) {
      return;
    }

    setSelectedTime(time);
  };

  const handleBookAppointment = async () => {
    if (!currentUser) {
      alert("Please login first to book an appointment");
      return;
    }

    if (!selectedDate) {
      alert("Please select a date");
      return;
    }

    if (!selectedTime) {
      alert("Please select a time slot");
      return;
    }

    if (isTimePassed(selectedTime)) {
      alert("This time slot has already passed. Please select another time.");
      setSelectedTime(null);
      return;
    }

    if (bookedSlots.includes(selectedTime)) {
      alert("This time slot is already booked. Please select another time.");
      setSelectedTime(null);
      return;
    }

    try {
      setBooking(true);

      const appointment = {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        patientName:
          currentUser.displayName ||
          currentUser.email?.split("@")[0] ||
          "Patient",
        doctorId: doctor._id,
        doctorName: doctor.name,
        doctorImage: doctor.image,
        speciality: doctor.speciality,
        date: `${selectedDate.date} ${selectedDate.month} ${selectedDate.year}`,
        time: selectedTime,
        address: `${doctor.address?.line1 || ""}, ${
          doctor.address?.line2 || ""
        }`,
        fee: doctor.fees,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/appointments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(appointment),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to book appointment");
      }

      alert("Appointment booked successfully!");
      navigate("/my-appointments");
    } catch (error) {
      console.error("Booking error:", error);
      alert(error.message || "Unable to book appointment");
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error || !doctor) {
    return (
      <div className="loading">
        {error || "Doctor not found"}
      </div>
    );
  }

  return (
    <div className="doctor-detail-container">
      <img
        className="doctor-image"
        src={assets[doctor.image]}
        alt={doctor.name}
      />

      <div className="doc-right">
        <div className="doc-content">
          <h1 className="doctor-name">{doctor.name}</h1>

          <div className="doctor-details">
            <span className="doctor-degree">
              {doctor.degree}
            </span>

            <span className="doctor-experience">
              {doctor.experience}
            </span>
          </div>

          <h3 className="about-title">About</h3>

          <p className="about-text">
            {doctor.about}
          </p>

          <p className="fee-text">
            Appointment fee: ${doctor.fees}
          </p>
        </div>

        <Calendar
          onDateSelect={handleDateSelect}
          selectedDate={selectedDate}
        />

        <div className="time d-flex gap-4 m-3">
          {timeSlots.map((time) => {
            const passed = isTimePassed(time);
            const booked = bookedSlots.includes(time);
            const disabled = passed || booked;

            return (
              <button
                key={time}
                type="button"
                disabled={disabled}
                className={`btn ${
                  selectedTime === time && !disabled
                    ? "btn-primary"
                    : "btn-outline-dark"
                } rounded-pill p-2`}
                onClick={() => handleTimeSelect(time)}
              >
                {booked ? "Booked" : time}
              </button>
            );
          })}
        </div>

        <button
          className="appointment-btn"
          onClick={handleBookAppointment}
          disabled={booking}
        >
          {booking ? "Booking..." : "Book an Appointment"}
        </button>
      </div>
    </div>
  );
};

export default DoctorDetail;