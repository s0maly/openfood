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
      // redirect to users page with appropriate id
      navigate('/users/', { state: { id: response.data.id } })
      
      // navigate('/users');
    } catch (e) {
      // console.log("la methode isAuth login page " , isAuthenticated);
      setError(e.response.data.error);
    }

  };

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="examail">Email</label>
          <input type="email" className="form-control" value={login} onChange={event => setEmail(event.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input type="password" className="form-control" value={password} onChange={event => setPassword(event.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Connexion</button>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
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