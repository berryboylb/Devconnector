import React, { useEffect  } from 'react';
import { connect } from 'react-redux';
import { getGithubRepo } from '../../actions/profile';
import Spinner from '../Layout/Spinner';
import PropTypes from 'prop-types';

const ProfileGithub = ({ username, getGithubRepo, repos  }) => {
    useEffect(() => {
        getGithubRepo(username)
    }, [getGithubRepo, username])
  return (
    <div className='profile-github'>
        <h2>Github Repos</h2>
        {repos === null  ? 
            <Spinner/>
        :
        <div>
            {repos.map((repo) => (
                <div key={repo._id} className="repo bg-white p-1 my-1">
                    <div>
                        <h4>
                            <a 
                                href={repo.html_url}
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                {repo.name}
                            </a>
                            <p>{repo.description}</p>
                        </h4>
                    </div>
                    <div>
                        <ul>
                            <li className='badge badge-primary'>
                                Stars: {repos.stargazers_count}
                            </li>
                            <li className='badge badge-dark'>
                                Watchers: {repos.watchers_count}
                            </li>
                            <li className='badge badge-light'>
                                Forks: {repos.forks_count}
                            </li>
                        </ul>
                    </div>
                </div>
            ))}
        </div>}
    </div>
  )
}

ProfileGithub.propTypes = {
    username: PropTypes.string.isRequired,
    getGithubRepo: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    repos: state.profile.repos
})

export default connect(mapStateToProps, { getGithubRepo })(ProfileGithub);