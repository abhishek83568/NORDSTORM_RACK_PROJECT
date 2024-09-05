import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'


const Checkout = () => {
    const navigate=useNavigate()
  return (
    <div className='redirectToHome'>
        <h1 className='congratulations'>Congratulations 💥 !!! Your Order is Placed </h1>
        <button onClick={()=>navigate('/')} className='GoToHome'>Continue Shopping</button>
    </div>
  )
}

export default Checkout