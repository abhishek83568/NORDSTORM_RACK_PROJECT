// src/components/Trending.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../Redux/action";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../App.css'

const Trending = () => {
  const trendingProduct = useSelector((state) => state.trending);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData(`http://localhost:7346/deals/get-deals`));
  }, [dispatch]);

  if (trendingProduct.isLoading) {
    return <div>Loading ...</div>;
  }

  if (trendingProduct.isError) {
    return <div>Error occurred! {trendingProduct.isError}</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="trending-slider" >
      {trendingProduct.data && trendingProduct.data.length ? (
        <Slider {...settings}>
          {trendingProduct.data
            .filter((item) => item.category === "Popular")
            .map((trending, index) => (
              <div key={index} className="trending-slide">
                <img src={trending.image} alt={trending.category} className="trending-image" />
                <h2>{trending.title}</h2>
                <p className="trending-price">${trending.price}</p>
              </div>
            ))}
        </Slider>
      ) : (
        <div>No Trending Products Found</div>
      )}
    </div>
  );
};

export default Trending;
