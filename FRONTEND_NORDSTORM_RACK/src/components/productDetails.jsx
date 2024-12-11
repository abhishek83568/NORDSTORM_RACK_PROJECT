import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
console.log(id)

  const addToCart = async () => {
    try {
      const cartResponse = await fetch(
        `https://nordstorm-rack-project.onrender.com/cart/user-cartData`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const cartData = await cartResponse.json();
      
    
      if (!Array.isArray(cartData.cartData)) {
        console.error("cartData is not an array:", cartData);
        return;
      }

      const existingProduct = cartData.cartData.find(
        (item) => item.productId === product._id
      );

      if (existingProduct) {
        const updatedProduct = {
          ...existingProduct,
          quantity: existingProduct.quantity + 1,
        };

        await fetch(
          `https://nordstorm-rack-project.onrender.com/cart/update-cartProduct/${existingProduct.productId}`,
          {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedProduct),
          }
        );
        navigate("/cart");
      } else {
        await fetch(
          `https://nordstorm-rack-project.onrender.com/cart/add-to-cart`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              ...product,
              productId: product._id,
            }),
          }
        );

        navigate("/cart");
      }
    } catch (error) {
      console.log(`Error adding to cart${error}`);
    }
  };

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
        <button className="product-actions" onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;
