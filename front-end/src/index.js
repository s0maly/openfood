import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import User from './Components/User';

class App extends Component{
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/users" element={<User/>} />
          </Routes>
        </div>
      </Router>
    );
  }
}

render(<App />, document.getElementById('root'));