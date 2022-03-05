import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Layout/Landing';
import Navbar from './components/Layout/Navbar';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';

function App() {
  return (
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path = "/" element={<Landing/>} />
          <Route path = "/register" element={<Register/>} />
          <Route path = "/login" element={<Login/>} />
        </Routes>
      </Router>
  );
}

export default App;
