import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const[formData, setFormData]= useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    //handle onchange events for signup form
    const handleChange= (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value});
    };

    const OnSubmit = async (e) => {
        e.preventDefault();
            // const newUser = { name, email, password };
            // try {
            //     const config = {
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     }
            //     const body = JSON.stringify(newUser);

            //     const res = await axios.post('http://localhost:5000/api/users', body, config);
            //     console.log(res.data);
            // } catch (error) {
            //     console.error(error.response.data);
            // }

        console.log('Success');
    
    }

  return (
    <section className='container'>
        <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
      <form className="form" onSubmit={OnSubmit}>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" name="password" value={password} onChange={handleChange} minLength="6"  required/>
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </section>
  )
}

export default Login;