import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import "./style.css";

function Register() {
    const [login, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    async function handleSubmit(e) {
        e.preventDefault();
        const data = { login, password };
        try {
            const response = await axios.post('http://localhost:8000/users/', data);
            localStorage.setItem('token', response.data.token);
            console.log(response.data);
            navigate('/');
        } catch (e) {
            setError(e.response.data.error);
        }
    }

    return (
        <div className="app">
            <div className="login-form">
                <div className="title">Inscription</div>
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
                        <button type="submit" className="btn btn-primary mt-3">Inscription</button>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default Register;