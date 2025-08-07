import './employeedashboard.css';
import { useEffect, useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

function EmployeeDashboard() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [form, setForm] = useState({ fromDate: '', toDate: '', reason: '' });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchLeaves = async (userId) => {
    try {
      const res = await axios.get(`/api/leaves/employee/${userId}`);
      setLeaveRequests(res.data);
    } catch (error) {
      console.error("Failed to fetch leave requests:", error);
    }
  };

  const applyLeave = async (e) => {
    e.preventDefault();
    if (!user || !user.id) return;

    try {
      await axios.post(`/api/leaves/${user.id}`, form);
      setForm({ fromDate: '', toDate: '', reason: '' });
      fetchLeaves(user.id);
    } catch (error) {
      console.error("Failed to apply for leave:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('employeeUser');
    navigate('/');
  };

  
  useEffect(() => {
    const storedUser = localStorage.getItem('employeeUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchLeaves(parsedUser.id);
    } else {
      navigate('/');
    }
  }, []);

  return (
    <div className="employee-dashboard">
      <h3>Employee Leave Management</h3>

      {user && (
        <div className="header">
          <h2>Welcome {user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Leaves Applied: {leaveRequests.length}</p>
        </div>
      )}

      <div className="apply-form">
        <h3>Apply for Leave</h3>
        <form onSubmit={applyLeave}>
          <input
            type="date"
            value={form.fromDate}
            onChange={e => setForm({ ...form, fromDate: e.target.value })}
            required
          />
          <input
            type="date"
            value={form.toDate}
            onChange={e => setForm({ ...form, toDate: e.target.value })}
            required
          />
          <textarea
            placeholder="Reason"
            value={form.reason}
            onChange={e => setForm({ ...form, reason: e.target.value })}
            required
          ></textarea>
          <button type="submit">Apply</button>
        </form>
      </div>

      <div className="leave-history">
        <h3>Leave History</h3>
        <ul>
          {leaveRequests.map(req => (
            <li key={req.id}>
              {req.fromDate} to {req.toDate} - {req.status}
            </li>
          ))}
        </ul>
      </div>

      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default EmployeeDashboard;
