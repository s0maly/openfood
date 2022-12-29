import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./style.css";

function Login() {

  const [login, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();


  async function handleSubmit(e) {
    //Prevent page reload
    e.preventDefault();

    const data = { login, password };

    try {
      const response = await axios.post('http://localhost:8000/login/', data);
      setSuccess(response.data.success);
      // setIsAuthenticated(true);
      // console.log("la methode isAuth login page " , isAuthenticated);
      navigate('/');
    } catch (e) {
      // console.log("la methode isAuth login page " , isAuthenticated);
      setError(e.response.data.error);
    }

  };

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input type="text" value={login} onChange={event => setEmail(event.target.value)} required />
        </div>
        <div className="input-container">
          <label>Mot de passe </label>
          <input type="password" value={password} onChange={event => setPassword(event.target.value)} required />
        </div>
        <div className="button-container">
          <button type="submit">Connexion</button>
          {error && <p>{error}</p>}
          {success && <p>{success}</p>}
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Connexion</div>
        {/* {isAuthenticated && <Home isAuthenticated={isAuthenticated} />} */}
        {renderForm}
      </div>
    </div>
  );
}

export default Login;