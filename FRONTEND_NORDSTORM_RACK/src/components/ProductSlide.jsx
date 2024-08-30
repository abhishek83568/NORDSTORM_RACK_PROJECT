import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../App.css'
import { useNavigate } from "react-router-dom";

const ProductSlide = () => {
  const navigate=useNavigate()
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const url='http://localhost:7346/product/get-products'
 
  const fetchProduct=async()=>{
    try {
       setIsLoading(true)
        const response=await fetch(url);
        const data=await response.json();
      

        if(data){
          setProduct(data.product)
          setIsLoading(false)
        }
    } catch (error) {
      setIsError(error.message);
      setIsLoading(false);
       
    }
  }

  useEffect(()=>{
fetchProduct()
  },[])

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isError !== null) {
    return <div>Error occured ! {isError}</div>;
  }

  const Arrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="offers-container">
      
      <div className="slider-container">
        <Slider {...settings}>
          {product.map((item, index) => (
            <div key={index} className="slide">
          
              <img src={item.image} alt={item.title} />
              <p className="title">{item.title}</p>
              <p> {` $ ${item.price}`}</p>
              <p> {item.category}</p>
              <button onClick={()=>navigate(`/clearance/${item._id}`)}>Quick view</button>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductSlide;
