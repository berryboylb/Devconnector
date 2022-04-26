import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const ProfileAbout = ({ profile: { bio, skills, user: { name } } }) => {
  return (
    <div className="profile-about bg-light p-2">
        <h2 className="text-primary">{name.trim().split(" ")[0]}'s Bio</h2>
        { bio && (<p>{bio}</p>) }
        <h2 className='text-primary'>Skill set</h2>
        { skills && 
            ( <div className="skills"> 
                {skills.map((skill) => 
                    (<div key={skill.id} className="p-1"> 
                        <FontAwesomeIcon icon={faCheck} />
                            {skill} 
                    </div>))}
                </div>
            )
        }
        
    </div>
  )
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileAbout