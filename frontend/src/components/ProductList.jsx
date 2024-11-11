import React, { useState } from 'react';
import { useGetProductsQuery, useDeleteProductMutation } from '../features/products/productApi';
import ProductForm from './ProductForm';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import './ProductList.css'; // Import the CSS file for styling

const ProductList = () => {
    const { data: products = [], error, isLoading } = useGetProductsQuery(); // Default to empty array
    const [deleteProduct] = useDeleteProductMutation();
    const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product for editing
    const [searchTerm, setSearchTerm] = useState(''); // State for name search
    const [selectedType, setSelectedType] = useState(''); // State for type filter
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        await deleteProduct(id);
    };

    const handleEdit = (product) => {
        setSelectedProduct(product); // Set selected product to edit
    };

    const handleFormSubmit = () => {
        setSelectedProduct(null); // Reset selected product after submission
    };

    // Extract unique product types for the dropdown
    const productTypes = [...new Set(products.map(product => product.type))];

    // Filter products based on search term and selected type
    const filteredProducts = products.filter(product => {
        const matchesName = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType ? product.type === selectedType : true; // Match type if selected
        return matchesName && matchesType; // Combine conditions
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="product-list-container">
            <NavBar />
            {/* Form for creating/updating a product */}
            <ProductForm productToEdit={selectedProduct} onFormSubmit={handleFormSubmit} />

            <h2>Product List</h2>
            <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input" // Add a class for styling
            />
            <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="type-select" // Add a class for styling
            >
                <option value="">All Types</option> {/* Default option to show all products */}
                {productTypes.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
            <ul className="product-list">
                {filteredProducts.map((product) => (
                    <li key={product._id} className="product-item">
                        <div className="product-info">
                            <strong>{product.name}</strong> - {product.type} - ${product.price} - Stock: {product.stock}
                        </div>
                        <div className="product-actions">
                            <button className="edit-button" onClick={() => handleEdit(product)}>Edit</button>
                            <button className="delete-button" onClick={() => handleDelete(product._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
