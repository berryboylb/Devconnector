import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Layout/Landing';
import Navbar from './components/Layout/Navbar';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
//Redux 
import { Provider } from 'react-redux';
import store from './store';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path = "/" element={<Landing/>} />
          <Route path = "/register" element={<Register/>} />
          <Route path = "/login" element={<Login/>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
