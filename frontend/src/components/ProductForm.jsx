import React, { useState, useEffect } from 'react';
import { useCreateProductMutation, useUpdateProductMutation } from '../features/products/productApi';
import './ProductForm.css'; // Ensure this is correctly pointing to your CSS file

const ProductForm = ({ productToEdit, onFormSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        price: '',
        stock: '',
    });

    const [errors, setErrors] = useState({});
    const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();

    useEffect(() => {
        if (productToEdit) {
            setFormData({
                name: productToEdit.name,
                type: productToEdit.type,
                price: productToEdit.price,
                stock: productToEdit.stock,
            });
        } else {
            setFormData({ name: '', type: '', price: '', stock: '' });
        }
    }, [productToEdit]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.type) newErrors.type = 'Type is required';
        if (!formData.price) {
            newErrors.price = 'Price is required';
        } else if (formData.price <= 0) {
            newErrors.price = 'Price must be a positive number';
        }
        if (!formData.stock) {
            newErrors.stock = 'Stock is required';
        } else if (formData.stock <= 0) {
            newErrors.stock = 'Stock must be a positive number';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        if (productToEdit) {
            await updateProduct({ id: productToEdit._id, ...formData });
        } else {
            await createProduct(formData);
        }
        onFormSubmit();
        setFormData({ name: '', type: '', price: '', stock: '' });
        setErrors({});
    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <h3>{productToEdit ? 'Update Product' : 'Add Product'}</h3>
            <label>Name:</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error-input' : ''}
            />
            {errors.name && <p className="error">{errors.name}</p>}

            <label>Type:</label>
            <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={errors.type ? 'error-input' : ''}
            />
            {errors.type && <p className="error">{errors.type}</p>}

            <label>Price:</label>
            <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={errors.price ? 'error-input' : ''}
            />
            {errors.price && <p className="error">{errors.price}</p>}

            <label>Stock:</label>
            <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className={errors.stock ? 'error-input' : ''}
            />
            {errors.stock && <p className="error">{errors.stock}</p>}

            <button className="submit-button" type="submit">{productToEdit ? 'Update' : 'Create'}</button>
        </form>
    );
};

export default ProductForm;
