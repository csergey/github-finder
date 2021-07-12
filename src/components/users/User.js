import React from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import Repos from '../repos/Repos';
import { Link } from 'react-router-dom';
import './users.styles.css';

class User extends React.Component{

    async componentDidMount(){
    this.setState({loading: true});
    this.props.getUser(this.props.match.params.login);
    this.props.getUserRepos(this.props.match.params.login);
    this.setState({loading: false});
  }

  static propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired
  }

    render(){

        const {name, 
                avatar_url, 
                location,
                bio,
                blog,
                login,
                html_url,
                followers,
                following,
                public_repos,
                public_gists,
                hireable,
                company} = this.props.user;
        const {loading,repos} = this.props;

        if(loading) return <Spinner/>

        return (
            <React.Fragment>

                <Link to='/' className='btn btn-light back'>
                  Back
                </Link>

                <div className='user-main-info card grid-2'>
                  <div className='all-center'>
                    <img src={avatar_url} alt='avatar' className='round-img user-avatar' 
                      style={{width:'170px'}}/>
                  
                    {name && (
                      <React.Fragment>
                          <h1>Name: {name}</h1>
                      </React.Fragment>
                    )}
                    
                    <div>
                      Hireable:{' '}
                      {hireable ? <i className='fas fa-check text-success'/> 
                                :<i className='fas fa-times-circle text-danger'/>}
                    </div>
                    {location && (
                      <React.Fragment>
                        <h3>Location:</h3>
                        <p>{location}</p>
                      </React.Fragment>
                    )}
                
                  </div>

                  <div style={{width:'100%'}}>
                    {bio && (
                      <React.Fragment>
                        <h3>Bio</h3>
                        <p style={{padding: '15px 0'}}>{bio}</p>
                      </React.Fragment>
                    )}
                    <a href={html_url} target='_blank' rel='noreferrer' className='btn btn-dark user-git'>Visit Github Profile</a>
                  
                  <ul style={{marginTop:'15px'}}>
                    <li>
                      {
                        login && <React.Fragment>
                          <strong>Username:</strong>{' '} {login}
                        </React.Fragment>
                      }
                    </li>
                    <li>
                      {
                        company && <React.Fragment>
                          <strong>Company:</strong>{' '} {company}
                        </React.Fragment>
                      }
                    </li>
                    <li>
                      {
                        blog && <React.Fragment>
                          <strong>Website:</strong>{' '} {blog}
                        </React.Fragment>
                      }
                    </li>
                  </ul>
                  
                  </div>
                </div>
                

                <div className='card text-center'>
                  <div className='badge badge-primary'>Followers: {followers}</div>
                  <div className='badge badge-success'>Following: {following}</div>
                  <div className='badge badge-danger'>Public Repos: {public_repos}</div>
                  <div className='badge badge-dark'>Public Gists: {public_gists}</div>
                </div>
                
                <Repos repos={repos} />

            </React.Fragment>
            )
    }
}

export default User;