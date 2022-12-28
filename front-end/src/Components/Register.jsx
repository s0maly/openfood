import React, { useState } from 'react';
import "./style.css";

const Register = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("email: ", email);
    }
    return (
        <div className="app">
            <div className="login-form">
                <h2 className="title">Inscription</h2>
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <div className="input-container">
                            <label type="name">Nom Complet</label>
                            <input value={username} name="name" onChange={(e) => setUsername(e.target.value)} id="name" />
                        </div>
                        <div className="input-container">
                            <label type="email">Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" />
                        </div>
                        <div className="input-container">
                            <label type="password">Mot de passe</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                        </div>
                        <div className='button-container'>
                            <button type="submit">Inscription</button>
                        </div>
                    </form>
                </div>

                {/* <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button> */}
            </div>
        </div>

    );
}

export default Register;