import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import './LeaveCalendar.css'; // 👈 Add this import for styling

const LeaveCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/leaves/calendar')
      .then(res => setEvents(res.data))
      .catch(err => console.error("Error loading calendar data", err));
  }, []);

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Employee Leave Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventColor="#ff5c5c"
        contentHeight="auto"
      />
    </div>
  );
};

export default LeaveCalendar;
