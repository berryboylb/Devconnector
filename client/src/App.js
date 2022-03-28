import { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Layout/Landing';
import Navbar from './components/Layout/Navbar';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
/*Redux 
provider allows our store to be accessed from anywhere*/
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/Layout/Alert';
import Test from './components/Test';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])
  
  return (
    <Provider store={store}>
      <Router>
        <Navbar/>
        <Alert/>
        <Routes>
          <Route exact path = "/" element={<Landing/>} />
          <Route path = "/register" element={<Register/>} />
          <Route path = "/login" element={<Login/>} />
          <Route path = '/dashboard' element={<Dashboard/>}/>
          <Route path = '/test' element={<Test/>}/>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
