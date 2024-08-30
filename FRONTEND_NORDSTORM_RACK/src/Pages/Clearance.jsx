import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import   '../App.css'

const Clearance = () => {
  const navigate=useNavigate()
  const { id } = useParams();
  const [singleProduct,setSingleProduct]=useState({})
  const [isError,setIsError]=useState(null)
  const token=localStorage.getItem('token')

  const fetchSingleProduct = async () => {
    try {
      if(id===":id"){
        return
      }
      const response=await fetch(`http://localhost:7346/product/get-product/${id}`)
      const data=await response.json();
      if(data){
        setSingleProduct(data.product)
      }
    } catch (error) {
      setIsError(error.message);
    
    }
  };
console.log(singleProduct)
const addToCart=async()=>{
try {
  const cartResponse=await fetch(`http://localhost:7346/cart/user-cartData`,{
    method:"GET",
    headers:{
      "content-type":"application/json",
      Authorization:`Bearer ${token}`
    }
  })

  const cartData=await cartResponse.json();
  console.log('Fetched cart data:', cartData.cartData); // Debugging line

  // Checking if cartData is an array
  if (!Array.isArray(cartData.cartData)) {
    console.error("cartData is not an array:", cartData);
    return;
  }
 

  const existingProduct=cartData.cartData.find((item)=>item.productId===singleProduct._id);
  
console.log(existingProduct)
  if(existingProduct){
    const updatedProduct={
      ...existingProduct,quantity:existingProduct.quantity+1
    }

    await fetch(`http://localhost:7346/cart/update-cartProduct/${existingProduct.productId}`,{
      method:"PATCH",
      headers:{
        "content-type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify(updatedProduct)
    })
  }
  else{
    await fetch(`http://localhost:7346/cart/add-to-cart`,{
      method:"POST",
      headers:{
        "content-type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({...singleProduct,productId:singleProduct._id})
    })

    navigate('/cart')
  }
  
  
    

    
  


} catch (error) {
  console.log(`Error adding to cart${error}`)
}
}

  useEffect(()=>{
    fetchSingleProduct()
  },[])


  if (isError !== null) {
    return <div>Error occured ! {isError}</div>;
  }

  const isProductAvailable=Object.keys(singleProduct).length>0
  return <div>
     {
        isProductAvailable ?
        <div className="singlePage-container">
     
      <div>
        <img src={singleProduct.image} alt={singleProduct.title} />
      </div>
      <h3>{singleProduct.title}</h3>
      <h2>{singleProduct.price}</h2>
      <button onClick={addToCart}>Add to Cart</button>
    </div>:"No product to view"
      }
    
  </div>;
};

export default Clearance;
