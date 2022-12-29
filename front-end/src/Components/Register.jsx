import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import "./style.css";

function Register() {
    const [login, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();


    async function handleSubmit(e) {
        e.preventDefault();
        const data = { login, password };
        try {
            const response = await axios.post('http://localhost:8000/users/', data);
            setSuccess(response.data.success);
            setTimeout(() => navigate('/'), 0);
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
                        <div className="input-container">
                            <label type="email">Email</label>
                            <input value={login} onChange={(e) => setEmail(e.target.value)} type="text" id="email" name="email" />
                        </div>
                        <div className="input-container">
                            <label type="password">Mot de passe</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                        </div>
                        <br />
                        <div className='button-container'>
                            <button type="submit">Inscription</button>
                            {error && <p>{error}</p>}
                            {success && <p>{success}</p>}
                        </div>
                    </form>

                </div>
            </div>
        </div>

    );
}

export default Register;