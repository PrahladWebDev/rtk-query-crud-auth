import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProductList from './components/ProductList';
import ProtectedRoute from './components/ProtectedRoute';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                <Route path="/products" element={<ProductList />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
