import React, { useState } from 'react';
import './AddProduct.css';

export default function AddProduct({ addProduct, closeForm }) {
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('a-c');

  const handleSubmit = (e) => {
    e.preventDefault();
    const displayProductType = getProductTypeDisplayName(productType);
    addProduct({ name: productName, type: displayProductType });
    setProductName('');
    setProductType('a-c');
    closeForm();
  };

  const getProductTypeDisplayName = (type) => {
    switch (type) {
      case 'a-c':
        return 'A/C';
      case 'lamp':
        return 'Lamp';
      case 'stereo':
        return 'Stereo System';
      case 'water-heater':
        return 'Water Heater';
      default:
        return 'Unavailable Product';
    }
  };

  return (
    <div className="add-product-container">
      <div className="add-product-form">
        <h2>Add a Product</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Product Name:</label>
            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div>
            <label>Product Type:</label>
            <select value={productType} onChange={(e) => setProductType(e.target.value)}>
              <option value="a-c">A/C</option>
              <option value="lamp">Lamp</option>
              <option value="stereo">Stereo System</option>
              <option value="water-heater">Water Heater</option>
            </select>
          </div>
          <button type="submit">Add Product</button>
          <button type="button" onClick={closeForm}>Cancel</button>
        </form>
      </div>
    </div>
  );
}
