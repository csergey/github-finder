
import './App.css';
import React from 'react';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/navbar/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/search/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';


import axios from 'axios';

class App extends React.Component{
  state = {
    users:[],
    repos:[],
    user:{},
    loading:false,
    alert: null
  }

  //Get all users by default
  // async componentDidMount(){
  //   this.setState({loading: true});
  //   const res = await axios.get('https://api.github.com/users');
  //   this.setState({loading: false, users: res.data});
  // }

  searchUsers = async text => {
    // if(text === ''){
    //   alert('Search what ?');
    //   return;
    // }

    this.setState({loading: true});   
    const res = await axios.get(`https://api.github.com/search/users?q=${text}`);
    this.setState({loading: false, users: res.data.items});
  }

  getUser = async (username) => {
    this.setState({loading: true });

    const res = await axios.get(
      `https://api.github.com/users/${username}`
    );
    this.setState({user: res.data, loading: false});
  }

  getUserRepos = async (username) => {
    this.setState({loading: true });

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
    );
    this.setState({repos: res.data, loading: false});
  }

  clearUsers = () => this.setState({users:[], loading: false});

  setAlert = ( msg, type ) => {

    if(msg === null)
      this.setState({alert: null});
    else
      this.setState({alert: {msg, type}});
    
    //option#1
    setTimeout(()=>this.setState({alert: null}),6000);
    //option#2 close on search keyup
  }

   render(){

    const {users, user, repos, loading} = this.state;

    return (
      <Router>
        <React.Fragment>
          <Navbar title="Github Finder" />
          <div className='container'>
            
          <Switch>

            <Route exact path='/' render={props => (
              <React.Fragment>
                <Search searchUsers={this.searchUsers} 
                    clearUsers={this.clearUsers} 
                    setAlert={this.setAlert}
                    showClearBtn={users.length > 0}
                    
                />
                <Alert alert={this.state.alert}/>

                <Users loading={loading} users={users}/>
              </React.Fragment>
            )}>
            </Route>
            <Route exact path='/about' component={About}/>
            <Route exact path='/user/:login' render={props => (
              <User 
                {...props} 
                getUser={this.getUser} 
                getUserRepos={this.getUserRepos} 
                user={user} 
                repos={repos}
                loading={loading}
                />
            )}/>
          </Switch>

          </div>
          
        </React.Fragment>
      </Router>
    );
  }
  
}

export default App;
