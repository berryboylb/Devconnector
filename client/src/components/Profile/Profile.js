import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../Layout/Spinner';
import { getProfileById } from '../../actions/profile';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = ({ profile : { profile, loading }, auth, getProfileById, match}) => {
    const {id} = useParams();
    useEffect(() => {
        getProfileById(id);
    }, [getProfileById, id])
  return (
    <div className='container'>
      {/* all the data here is comming from the second profile inside the first one */}
        {profile === null || loading ? <Spinner/> : 
        <>
          <Link to="/profiles" className='btn btn-light' >Back To Profiles </Link>
          {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id &&
          <Link to="/edit-profile" className="btn btn-dark">Edit Profile</Link>
          }
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile}/>
            <ProfileAbout profile={profile}/>
            <div className='profile-exp bg-white p-2'>
              <h2 className="text-primary">Experience</h2>
              {profile.experience && profile.experience.length > 0 ?
                (<>
                  {profile.experience.map((experience) => (
                    <ProfileExperience key={experience._id} experience={experience} />
                  ))}
                </>)
                :
                (<h4>No experience credentials</h4>)
              }
            </div>
            <div className='profile-edu bg-white p-2'>
              <h2 className="text-primary">Education</h2>
              {profile.education && profile.education.length > 0 ?
                (<>
                  {profile.education.map((education) => (
                    <ProfileEducation key={education._id} education={education}/>
                  ))}
                </>)
                :
                (<h4>No education credentials</h4>)
              }
            </div>
            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername}/>
            )}
          </div>
        </>}
    </div>
  )
}

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfileById })(Profile);