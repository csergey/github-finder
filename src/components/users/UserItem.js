import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './UserItem.styles.css';

const UserItem = ({user: {avatar_url,login,html_url,blog}}) => {

     return(
         <div className='card text-center'>          
             <img src={avatar_url} className='profile-img' alt='progile-img'/>
             <h3 className='title'>{login}</h3>
             <p>{blog}</p>
             <div>
                <Link rel='noreferrer' to={`/user/${login}`} >{/* target='_blank' */}
                    
                    <i className="fab fa-github-square btn-dark"></i>  More
                </Link>
             </div>
             

         </div>
     );   
}

UserItem.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserItem;