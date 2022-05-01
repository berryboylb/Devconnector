import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faBlackboard, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
        <Link to="/edit-profile" className="btn btn-light"><FontAwesomeIcon icon={faUserCircle} /> Edit Profile</Link>
        <Link to="/add-experience" className="btn btn-light"><FontAwesomeIcon icon={faBlackboard} /> Add Experience</Link>
        <Link to="/add-education" className="btn btn-light"><FontAwesomeIcon icon={ faGraduationCap} /> Add Education</Link>
    </div>
  )
}

export default DashboardActions