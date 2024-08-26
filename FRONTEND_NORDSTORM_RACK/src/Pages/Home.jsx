import React from 'react'
import TopDeals from '../assets/TopDeals.webp'
import BrandSlideshow from '../components/BrandSlideshow'
import FlashOffer from '../assets/FlashOffer.png'
import Shopping from '../components/Shopping'



const Home = () => {
  return (
    <div style={{margin:"30px"}}>
      <h1>Welcome to HomePage</h1>
      <hr />
      <img src={TopDeals} alt="TopDeals" style={{marginBottom:"10px"}} />
      <hr />
      <BrandSlideshow/>

      <hr />

      <img src={FlashOffer} alt="TopDeals" style={{marginTop:"20px"}} />

      <hr />

      <Shopping/>

      <hr />
      <div>
        <h1 style={{fontSize:"30px"}}><b>Recommended for You in Great Brands, Great Prices</b></h1>
         
      </div>
    
    </div>
  )
}

export default Home