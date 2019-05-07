import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import HomePage from './pages/Home';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <BrowserRouter>

      <Route path='/' exact={true} render={()=>{
        return (<Redirect to='/login'/>)
      }}></Route>

      <Route path='/login' component={LoginPage}></Route>
      <Route path='/home' component={HomePage}></Route>
      <Route path='/register' component={RegisterPage}></Route>

    </BrowserRouter>
      
    </div>
  );
}

export default App;
