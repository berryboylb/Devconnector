import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
  const authLinks = (
    <ul>
      <li><a onClick={logout} href="#!"><FontAwesomeIcon icon={faSignOutAlt} />{' '} 
      <span className='hide-sm'>Logout</span></a></li>
    </ul>
  )

  const guestLinks =  (
    <ul>
      <li><a href="#!">Developers</a></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  )
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
      </h1>
       { !loading && (<>{ isAuthenticated ? authLinks : guestLinks }</>) }
    </nav>
  )
}

Navbar.propTypes = {
   logout: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired
}
//this is comming from the auth store
const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps,{ logout })(Navbar);