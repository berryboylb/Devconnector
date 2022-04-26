import { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Link,} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faUser } from '@fortawesome/free-solid-svg-icons'
import { createProfile, getCurrentProfile } from '../../actions/profile';
import PropTypes from 'prop-types';

const EditProfile = ({ profile: { profile, loading }, createProfile, history, getCurrentProfile }) => {

    
    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
    });

    const [displaySocialInputs, toggleSocialInputs] = useState(false);
    useEffect(() => {
        getCurrentProfile();

        //populating the data inside the form so they are not empty
        //remember we are using the profile inside the profile object to get this data
        /*if we are not using redux we'd have to get the object from the axios fetch request and
        call setformdata inside  success part*/
        setFormData({
            company: loading || !profile.company ? "" : profile.company,
            website: loading || !profile.website ? "" : profile.website,
            location: loading || !profile.location ? "" : profile.location,
            status: loading || !profile.status ? "" : profile.status,
            skills: loading || !profile.skills ? "" : profile.skills.join(','),
            githubusername: loading || !profile.githubusername ? "" : profile.githubusername,
            bio: loading || !profile.bio ? "" : profile.bio,
            twitter: loading || !profile.social ?  "" : profile.social.twitter,
            facebook: loading || !profile.social ? "" : profile.social.facebook,
            linkedin: loading || !profile.social ? "" : profile.social.linkedin,
            youtube: loading || !profile.social ? "" : profile.social.youtube,
            instagram: loading || !profile.social ? "" : profile.social.instagram
        })
    }, [loading, getCurrentProfile])
    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = (e) => {
        e.preventDefault();
        //added true so it redirects
        createProfile(formData, true);
    }
  return (
    <section class="container">
      <h1 class="large text-primary">
        Create Your Profile
      </h1>
      <p class="lead">
       <FontAwesomeIcon icon={faUser} /> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={onSubmit}>
        <div class="form-group">
          <select name="status" value={status} onChange={e => onChange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small class="form-text">Give us an idea of where you are at in your career</small>
        </div>
        <div class="form-group">
          <input type="text" placeholder="Company" name="company" value={company} onChange={e => onChange(e)} />
          <small class="form-text">Could be your own company or one you work for</small>
        </div>
        <div class="form-group">
          <input type="text" placeholder="Website" name="website" value={website} onChange={e => onChange(e)} />
          <small class="form-text">Could be your own or a company website</small>
        </div>
        <div class="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)} />
          <small class="form-text">City & state suggested (eg. Boston, MA)</small>
        </div>
        <div class="form-group">
          <input type="text" placeholder="* Skills" name="skills"value={skills} onChange={e => onChange(e)} />
          <small class="form-text">Please use comma separated values (eg.HTML,CSS,JavaScript,PHP)</small>
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={e => onChange(e)}
          />
          <small class="form-text">If you want your latest repos and a Github link, include yourusername</small>
        </div>
        <div class="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e => onChange(e)}></textarea>
          <small class="form-text">Tell us a little about yourself</small>
        </div>

        <div class="my-2">
          <button type="button" class="btn btn-light" onClick={() => toggleSocialInputs(!displaySocialInputs)}>
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
            <>
                <div class="form-group social-input">
                    <i class="fab fa-twitter fa-2x"></i>
                    <input type="text" placeholder="Twitter URL"  name="twitter" value={twitter} onChange={e => onChange(e)} />
                </div>

                <div class="form-group social-input">
                    <i class="fab fa-facebook fa-2x"></i>
                    <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e => onChange(e)} />
                </div>

                <div class="form-group social-input">
                    <i class="fab fa-youtube fa-2x"></i>
                    <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={e => onChange(e)} />
                </div>

                <div class="form-group social-input">
                    <i class="fab fa-linkedin fa-2x"></i>
                    <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={e => onChange(e)} />
                </div>

                <div class="form-group social-input">
                    <i class="fab fa-instagram fa-2x"></i>
                    <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e => onChange(e)} />
                </div>
            </>
        )}
        
        <input type="submit" class="btn btn-primary my-1" value='submit' />
        <Link class="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </section>
  )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(EditProfile);