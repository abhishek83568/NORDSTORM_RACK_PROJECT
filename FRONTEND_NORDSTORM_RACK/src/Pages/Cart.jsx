import { useEffect, useState } from "react";
import '../App.css'

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const token = localStorage.getItem("token");

  const fetchCartData = async () => {
    const response = await fetch(
      `https://nordstorm-rack-project.onrender.com/cart/user-cartData`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    setCartData(data.cartData);
  };
  const deleteProduct = async (id) => {
  
    const response = await fetch(
      `https://nordstorm-rack-project.onrender.com/cart/delete-cartProduct/${id}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    

    if (response.ok) {
      
      setCartData(cartData.filter((item) => item.productId !== id));
    } else {
      console.log("Failed to delete the product:", response.statusText);
    }
  };

  const handleQuantity = async (id, newQty) => {
    try {
      const response = await fetch(
        `https://nordstorm-rack-project.onrender.com/cart/update-cartProduct/${id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantity: newQty }),
        }
      );

      if (response.ok) {
        const updatedData = cartData.map((item) =>
          item._id === id ? { ...item, quantity: newQty } : item
        );
        setCartData(updatedData);
        fetchCartData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQty = (id, quantity) => {
    if (quantity > 1) {
      handleQuantity(id, quantity - 1);
    }
  };

  const increaseQty = (id, quantity) => {
    handleQuantity(id, quantity + 1);
  };

  const calculateTotal = () => {
    return cartData
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  return (
    <div>
      {cartData.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartData.map((el) => (
              <tr key={el._id}>
                <td>
                  <img
                    src={el.image}
                    alt={el.title}
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td>
                  <p>{el.title}</p>
                </td>
                <td>
                  <p>{el.price}</p>
                </td>
                <td>
                  <button className="substractBtn"
                    onClick={() => decreaseQty(el.productId, el.quantity)}
                  >
                    -
                  </button>
                  <h4>{el.quantity}</h4>
                  <button className="addBtn"
                    onClick={() => increaseQty(el.productId, el.quantity)}
                  >
                    +
                  </button>
                </td>
                <td>
                  <button className="removeBtn" onClick={() => deleteProduct(el.productId)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {cartData.length > 0 && (
        <div >
          <h2 className="cart-total">Total: {calculateTotal()}</h2>
        </div>
      )}
    </div>
  );
};

export default Cart;
