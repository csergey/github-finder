import React from 'react';
import PropTypes from 'prop-types';

import './search.styles.css';

class Search extends React.Component{
    state = {
        searchText: ''
    };

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        showClearBtn: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired,
        clearUsers: PropTypes.func
    }

    changeSearchInputHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});

        this.props.setAlert(null);
    }

    onSubmitSearch = (e) => {
        e.preventDefault();

        if(this.state.searchText === '') {
            this.props.setAlert('Please enter something', 'light');
        }else{
            this.props.searchUsers(this.state.searchText);
            //this.setState({searchText:''}); //Do not clear after search
        }
    }

    clearUsersInput = () => {
        this.setState({searchText: ""});
        this.props.clearUsers();
    }

    render(){

        const {showClearBtn} = this.props;

        return(
            <div>
                <form className='form' onSubmit = {this.onSubmitSearch}>
                    <input 
                        type='text' 
                        name='searchText' 
                        placeholder='Search Users...' 
                        value={this.state.searchText} 
                        autoFocus={true}
                        onChange = {this.changeSearchInputHandler}
                    />
                    <input 
                        type='submit' 
                        value='Search' 
                        className='submit-search btn btn-dark btn-block'
                    />
                </form>
                <button type='button' className={`clear-page btn btn-light btn-block ${showClearBtn ? "":" hidden"}`}
                    onClick={this.clearUsersInput}
                >Clear</button>
            </div>
        );
    }
}
export default Search;