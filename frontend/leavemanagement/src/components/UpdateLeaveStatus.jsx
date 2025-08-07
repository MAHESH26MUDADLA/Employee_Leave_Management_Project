import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function UpdateLeaveStatus() {
  const { id } = useParams();
  const [managerId, setManagerId] = useState("");
  const [status, setStatus] = useState("");

  const handleUpdate = async () => {
    try {
        await axios.put(`http://localhost:8080/api/leaves/${id}`, null, {
        params: { status, userId: managerId }
      });
      alert("Leave status updated");
    } catch {
      alert("Error updating status");
    }
  };

  return (
    <div>
      <h3>Update Leave Status</h3>
      <input className="form-control mb-2" placeholder="Manager ID" value={managerId} onChange={(e) => setManagerId(e.target.value)} />
      <select className="form-control mb-2" value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Select Status</option>
        <option value="APPROVED">Approve</option>
        <option value="REJECTED">Reject</option>
      </select>
      <button className="btn btn-success" onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default UpdateLeaveStatus;
