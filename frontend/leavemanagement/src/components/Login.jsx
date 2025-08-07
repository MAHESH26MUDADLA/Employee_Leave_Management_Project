// Login.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Assuming you have a CSS file for styling

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 
  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('/api/users/login', { email, password });

    
    if (res.data.role === 'EMPLOYEE') {
      localStorage.setItem('employeeUser', JSON.stringify(res.data));
      navigate('/employee');
    } else if (res.data.role === 'MANAGER') {
      localStorage.setItem('managerUser', JSON.stringify(res.data));
      navigate('/manager');
    }
  } catch (err) {
    alert('Invalid email or password');
  }
};

 return (
  <div className="login-page">
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
);

}

export default Login;
