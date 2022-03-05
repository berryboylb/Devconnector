import React, { useState } from 'react'

const Register = () => {
    const[formData, setFormData]= useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    });

    const { name, email, password, password2 } = formData;

    //handle onchange events for signup form
    const handleChange= (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value});
    };

    const OnSubmit = (e) => {
        e.preventDefault();
        if(password !== password2){
            console.log('Passwords do not match');
        }else {
            console.log(formData);
        }
    }

  return (
    <section className='container'>
        <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={OnSubmit}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={handleChange} required />
          <small className="form-text">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" name="password" value={password} onChange={handleChange} minLength="6"  required/>
        </div>
        <div className="form-group">
          <input type="password" placeholder="Confirm Password" name="password2" value={password2} onChange={handleChange} minLength="6" required />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <a href="login.html">Sign In</a>
      </p>
    </section>
  )
}

export default Register