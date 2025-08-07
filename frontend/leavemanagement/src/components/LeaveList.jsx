import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function LeaveList() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/leaves")
      .then((res) => {
        console.log(res.data);  // Log the data to check if it's an array
        setLeaves(res.data);
      })
      .catch((err) => console.error("Error loading leaves"));
  }, []);

  return (
    <div>
      <h3>Leave Requests</h3>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee</th>
            <th>Status</th>
            <th>Dates</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.id}</td>
              <td>{leave.employee?.name || leave.employee?.id}</td>
              <td>{leave.status}</td>
              <td>{leave.startDate} to {leave.endDate}</td>
              <td>
                <Link to={`/update/${leave.id}`} className="btn btn-sm btn-info">Update</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveList;
