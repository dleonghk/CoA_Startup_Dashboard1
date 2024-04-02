import React, { useState } from "react";
import './Login.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // LOGIN LOGIC!!
        alert(`Login attempt with username: ${username} and password: ${password}`);
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input 
                id="username" 
                type="text" 
                value ={username}
                onChange={(e) => setUsername(e.target.value)}
                required />
                <label htmlFor="password">Password:</label>
                <input 
                id="password" 
                type="password" 
                value ={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;