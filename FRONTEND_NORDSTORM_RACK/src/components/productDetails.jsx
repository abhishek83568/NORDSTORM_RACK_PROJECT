import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (id === ":id") return;

        const response = await fetch(
          `https://nordstorm-rack-project.onrender.com/product/get-product/${id}`
        );

        if (response.ok) {
          const data = await response.json();
          setProduct(data.product);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchProductDetails();
  }, [id]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="product-details">
      <div className="product-image">
        <img src={product.image} alt={product.title} />
      </div>

      <div className="product-info">
        <h2 className="product-title">{product.title}</h2>
        <p className="price">Price: ${product.price}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Sub-Category:</strong> {product.subCategory}</p>
        <p><strong>Description:</strong> {product.description}</p>
        <button className="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;
