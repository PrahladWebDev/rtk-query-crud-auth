import React, { useState } from 'react';
import { useRegisterMutation } from '../features/auth/authApi';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css'; // Import the CSS file for styling
import NavBar from './NavBar';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [register, { isLoading }] = useRegisterMutation();
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Reset error message on new registration attempt

        try {
            const res = await register({ username, password });
            if (res.error) {
                // Assuming the API returns an error with a specific message for duplicate entry
                if (res.error.status === 400) {
                    setErrorMessage('Username already exists. Please choose another.'); // Update based on your API error structure
                } else {
                    setErrorMessage('Registration failed. Please try again.'); // Generic error message
                }
            } else {
                navigate('/login'); // Navigate to login on successful registration
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.'); // Catch any unexpected errors
        }
    };

    return (
        <>
        <NavBar/>
        <div className="register-container">
            <h2>Register</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
            <form className="register-form" onSubmit={handleRegister}>
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
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
        </>
    );
};

export default RegisterPage;
