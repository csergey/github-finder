import React from 'react';
import { Link } from 'react-router-dom';
import './users.styles.css';

class User extends React.Component{

    async componentDidMount(){
    this.setState({loading: true});
    //const res = await axios.get('https://api.github.com/users');
    this.props.getUser(this.props.match.params.login);
    this.setState({loading: false});
  }

    render(){

        const {name, avatar_url, location,bio,blog,login,html_url,followers,following,
                public_repos,public_gists,hireable} = this.props.user;
        const {loading} = this.props;

        return (
            <div className='user'>
                <p>
                    <img src={avatar_url} className='user-avatar'></img>
                </p>
                <p>Name: {name}</p>
                <p>Bio: {bio}</p>
                <p>Login: {login}</p>
                <p><Link to={html_url} target='_blank'>{html_url}</Link></p>
                <p>{public_repos}</p>
                <p><Link to={blog} target='_blank'>{blog}</Link></p>
            </div>
            )
    }
}

export default User;