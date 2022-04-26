import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../Layout/Spinner';
import { getProfiles } from '../../actions/profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faConnectdevelop } from '@fortawesome/free-brands-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Profiles = ({ profile: { profiles, loading }, getProfiles }) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles])

    return (
        <>
            {loading ? <Spinner/> : 
                <>
                   <section className="container">
                   <h1 className="large" >Developers</h1>
                    <p className="lead"><FontAwesomeIcon icon={faConnectdevelop} /> Browse and collect developers</p>
                    <div className="profiles">
                        {profiles.length > 0 ? (
                            profiles.map((profile) => (
                                (<div className='profile bg-light' key={profile._id} style={{ marginTop: "1rem" }}>
                                <img src={profile.user.avatar ? profile.user.avatar : 'http://www.gravatar.com/avatar/d415f0e30c471dfdd9bc4f827329ef48'} alt="" className="round-img" />
                                <div>
                                    <h2>{profile.user.name}</h2>
                                    <p>{profile.status} { profile.company && <span> at {profile.company}</span>}</p>
                                    <p className='my-1'> { profile.location && <span>{profile.location}</span>}</p>
                                    <Link to={`/profile/${ profile.user._id}`} className="btn btn-primary">View Profile</Link>
                                </div>
                                <ul>
                                    showing four skills at a single time
                                    {profile.skills.slice(0, 4).map((skill, index) => (
                                        <li key={index} className='text-primary'>
                                            <FontAwesomeIcon icon={faCheck} /> {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>)
                            ))
                        ) : <h4>No Profiles</h4>}
                    </div>
                   </section>
                </>
            }
        </>
  )
}

Profiles.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfiles: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles);