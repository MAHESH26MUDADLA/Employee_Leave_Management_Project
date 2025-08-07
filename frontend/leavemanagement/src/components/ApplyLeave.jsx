import React, { useState } from "react";
import axios from "axios";

function ApplyLeave() {
  const [employeeId, setEmployeeId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post(`http://localhost:8080/api/leaves/${employeeId}`, {
            fromDate: startDate,
            toDate: endDate,
            reason,
          });
      alert("Leave request submitted successfully.");
    } catch (err) {
      alert("Error submitting leave request.");
    }
  };

  return (
    <div>
      <h3>Apply for Leave</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" type="text" placeholder="Employee ID" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} required />
        <input className="form-control mb-2" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        <input className="form-control mb-2" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        <textarea className="form-control mb-2" placeholder="Reason" value={reason} onChange={(e) => setReason(e.target.value)} required />
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ApplyLeave;