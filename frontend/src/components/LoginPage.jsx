import React, { useState } from 'react';
import { useLoginMutation } from '../features/auth/authApi';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import './LoginPage.css'; // Import the CSS file for styling

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading, error }] = useLoginMutation();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Reset error message on new login attempt
        const res = await login({ username, password });

        if (res.data) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', res.data.username);
            console.log('Token:', res.data.token);
            console.log('Username:', res.data.username);
            navigate('/products');
        } else if (res.error) {
            // Assuming the error response contains a message
            setErrorMessage(res.error.data.message || 'Invalid credentials.'); // Adjust based on your API error structure
        }
    };

    return (
        <>
            <NavBar />
            <div className="login-container">
                <h2>Login</h2>
                {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
                <form className="login-form" onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default LoginPage;
