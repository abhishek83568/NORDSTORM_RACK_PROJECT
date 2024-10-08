import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../App.css";
import { useNavigate } from "react-router-dom";

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const navigate = useNavigate();

  const url = `https://nordstorm-rack-project.onrender.com/deals/get-deals`;
  const fetchDeals = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const data = await response.json();

      if (data) {
        setDeals(data.product);
        setIsLoading(false);
      }
    } catch (error) {
      setIsError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

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
        style={{
          ...style,
          display: "block",
          background: "gray",
          borderRadius: "25px",
          padding: "1px",
        }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,

    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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
    <div className="top-brands-slider">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>
          <b>Top 100 Deals</b>
        </h1>
        <button className="button" onClick={() => navigate("/flashEvents")}>
          View All Top 100 Deals
        </button>
      </div>
      <Slider {...settings}>
        {deals && deals.length
          ? deals
              .filter((imageItem) => imageItem.category === "New")
              .map((imageItem) => (
                <div key={imageItem.title} className="slide">
                  <div className="slide-content">
                    <img
                      src={imageItem.image}
                      alt={imageItem.title}
                      className="square-image"
                    />
                    <h2 className="category">{imageItem.category}</h2>

                    <p className="title">{imageItem.title}</p>
                    <p> {`$ ${imageItem.price}`}</p>
                  </div>
                </div>
              ))
          : null}
      </Slider>
    </div>
  );
};

export default Deals;
