import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './search.styles.css';

const Search = ({showClearBtn , setAlert, searchUsers, clearUsers}) => {
  
    const [searchText,setSearchText] = useState('');

    const changeSearchInputHandler = (e) => {
        setSearchText(e.target.value);
        setAlert(null);
    }

    const onSubmitSearch = (e) => {
        e.preventDefault();

        if(searchText === '') {
            setAlert('Please enter something', 'light');
        }else{
            searchUsers(searchText);
            //setSearchText(''); //Do not clear after search
        }
    }

    const clearUsersInput = () => {
        setSearchText('');
        clearUsers();
    }

    return(
        <div>
            <form className='form' onSubmit = {onSubmitSearch}>
                <input 
                    type='text' 
                    name='searchText' 
                    placeholder='Search Users...' 
                    value={searchText} 
                    autoFocus={true}
                    onChange = {changeSearchInputHandler}
                />
                <input 
                    type='submit' 
                    value='Search' 
                    className='submit-search btn btn-dark btn-block'
                />
            </form>
            <button type='button' className={`clear-page btn btn-light btn-block ${showClearBtn ? "":" hidden"}`}
                onClick={clearUsersInput}
            >Clear</button>
        </div>
    );
    
}

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    showClearBtn: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
    clearUsers: PropTypes.func
};
export default Search;