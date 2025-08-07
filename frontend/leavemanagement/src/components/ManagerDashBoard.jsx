import { useEffect, useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import './managerdashboard.css';
import LeaveCalendar from './LeaveCalendar';

function ManagerDashboard() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'EMPLOYEE' });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchRequests = async () => {
    try {
      const res = await axios.get('/api/leaves');
      setLeaveRequests(Array.isArray(res.data) ? res.data : res.data.leaveRequests || []);
    } catch (error) {
      console.error("Failed to fetch leave requests:", error);
      setLeaveRequests([]);
    }
  };

  const updateStatus = async (id, status) => {
    if (!user || !user.id) {
      console.error("User not found. Cannot update status.");
      return;
    }
    try {
      await axios.put(`/api/leaves/${id}`, null, {
        params: { status, userId: user.id }
      });
      fetchRequests();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const deleteLeave = async (id) => {
    if (!user || !user.id) {
      console.error("User not found. Cannot delete leave.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this leave request?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/leaves/${id}`, {
        params: { userId: user.id }
      });
      fetchRequests();
    } catch (error) {
      console.error("Failed to delete leave request:", error);
    }
  };

  const createUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users', newUser);
      setNewUser({ name: '', email: '', password: '', role: 'EMPLOYEE' });
      alert('User created successfully');
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('managerUser');
    navigate('/');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('managerUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchRequests();
    } else {
      navigate('/');
    }
  }, []);

  const isPastLeave = (leave) => {
    const today = new Date().toISOString().split('T')[0];
    return leave.toDate < today;
  };

  const upcomingRequests = leaveRequests.filter(req => !isPastLeave(req));
  const pastRequests = leaveRequests.filter(req => isPastLeave(req));

  return (
    <div className="manager-dashboard">
      <h3>Employee Leave Management</h3>
      <h2>Manager Dashboard</h2>

      <h3>Create New User</h3>
      <form onSubmit={createUser} className="create-user-form">
        <input type="text" placeholder="Name" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} required />
        <input type="email" placeholder="Email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} required />
        <input type="password" placeholder="Password" value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} required />
        <select value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}>
          <option value="EMPLOYEE">Employee</option>
          <option value="MANAGER">Manager</option>
        </select>
        <button type="submit">Create User</button>
      </form>

      <h3>Upcoming Leave Requests</h3>
      <div className="leave-requests">
        {upcomingRequests.length > 0 ? (
          upcomingRequests.map(req => (
            <div className="request" key={req.id}>
              <div className="request-header">
                <div><strong>Name:</strong> {req.employee?.name || "Unknown"} &nbsp;&nbsp;
                  <strong>Email:</strong> {req.employee?.email || "N/A"}</div>
                <div><strong>From:</strong> {req.fromDate} &nbsp;&nbsp;
                  <strong>To:</strong> {req.toDate}</div>
              </div>
              <p><strong>Reason:</strong> {req.reason}</p>
              <select onChange={e => updateStatus(req.id, e.target.value)} value={req.status}>
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
              <button className="delete-btn" onClick={() => deleteLeave(req.id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No upcoming leave requests.</p>
        )}
      </div>

      <h3>Past Leave Requests</h3>
      <div className="leave-requests">
        {pastRequests.length > 0 ? (
          pastRequests.map(req => (
            <div className="request" key={req.id}>
              <div className="request-header">
                <div><strong>Name:</strong> {req.employee?.name || "Unknown"} &nbsp;&nbsp;
                  <strong>Email:</strong> {req.employee?.email || "N/A"}</div>
                <div><strong>From:</strong> {req.fromDate} &nbsp;&nbsp;
                  <strong>To:</strong> {req.toDate}</div>
              </div>
              <p><strong>Reason:</strong> {req.reason}</p>
              <p><strong>Status:</strong> {req.status}</p>
              <button className="delete-btn" onClick={() => deleteLeave(req.id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No past leave requests.</p>
        )}
      </div>

      <div className="calendar-section">
        <LeaveCalendar />
      </div>

      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default ManagerDashboard;
