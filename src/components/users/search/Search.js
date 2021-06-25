import React from 'react';
import PropTypes from 'prop-types';

import './search.styles.css';

class Search extends React.Component{
    state = {
        searchText: ''
    };

    static propTypes = {
        searchUsers: PropTypes.func.isRequired
    }
    changeSearchInputHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmitSearch = (e) => {
        e.preventDefault();
        this.props.searchUsers(this.state.searchText);
        this.setState({text:''});
    }

    render(){
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
            </div>
        );
    }
}
export default Search;