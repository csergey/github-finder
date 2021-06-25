
import './App.css';
import React from 'react';
import Navbar from './components/layout/navbar/Navbar';
import Users from './components/users/Users';
import Search from './components/users/search/Search';

import axios from 'axios';

class App extends React.Component{
  state = {
    users:[],
    loading:false
  }
  // async componentDidMount(){
  //   this.setState({loading: true});
    
  //   const res = await axios.get('https://api.github.com/users');

  //   this.setState({loading: false, users: res.data});

  // }

  searchUsers = async text => {
    if(text === ''){
      alert('Search what ?');
      return;
    }
    this.setState({loading: true});
    
    const res = await axios.get(`https://api.github.com/search/users?q=${text}`);

    this.setState({loading: false, users: res.data.items});
  }

   render(){
    return (
      <React.Fragment>
        <Navbar title="Github Finder" />
        
        <div className='container'>
          <Search searchUsers={this.searchUsers}/>
          <Users loading={this.state.loading} users={this.state.users}/>
        </div>
      </React.Fragment>
    );
  }
  
}

export default App;
