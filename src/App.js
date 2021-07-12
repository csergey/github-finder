
import './App.css';
import React, {useState} from 'react';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/navbar/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/search/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';


import axios from 'axios';

const App = () => {

  const [users,setUsers] = useState([]);
  const [repos,setRepos] = useState([]);
  const [user,setUser] = useState({});
  const [loading,setLoading] = useState(false);
  const [alert,setAlert] = useState(null);


  const searchUsers = async text => {
    // if(text === ''){//   alert('Search what ?');//   return;// }
    setLoading(true);   
    const res = await axios.get(`https://api.github.com/search/users?q=${text}`);
    setUsers(res.data.items);
    setLoading(false);
  };

  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}`);
    setUser(res.data);
    setLoading(false);
  };

  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`);
    setRepos(res.data);
    setLoading(false);
    
  };

  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  const showAlert = ( msg, type ) => {

    if(msg === null)
      setAlert(null);
    else
      setAlert({msg, type});
    
    //option#1
    setTimeout(()=>setAlert(null),6000);
    //option#2 close on search keyup
  };

    return (
      <Router>
        <React.Fragment>
          <Navbar title="Github Finder" />
          <div className='container'>
            
          <Switch>

            <Route exact path='/' render={props => (
              <React.Fragment>
                <Search searchUsers={searchUsers} 
                    clearUsers={clearUsers} 
                    setAlert={showAlert}
                    showClearBtn={users.length > 0}
                    
                />
                <Alert alert={alert}/>

                <Users loading={loading} users={users}/>
              </React.Fragment>
            )}>
            </Route>
            <Route exact path='/about' component={About}/>
            <Route exact path='/user/:login' render={props => (
              <User 
                {...props} 
                getUser={getUser} 
                getUserRepos={getUserRepos} 
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

export default App;
