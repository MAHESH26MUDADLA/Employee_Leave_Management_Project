import Header from './components/Header'
import { Route, Routes } from "react-router-dom";
import Login from './components/Login'
import EmployeeDashboard from './components/EmployeeDashBoard'
import ManagerDashboard from './components/ManagerDashBoard'
import './App.css'

function App() {
  return (
    <>

         <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/employee" element={<EmployeeDashboard />} />
          <Route path="/manager" element={<ManagerDashboard />} />
        </Routes> 
      
    </>
  )
}

export default App;
