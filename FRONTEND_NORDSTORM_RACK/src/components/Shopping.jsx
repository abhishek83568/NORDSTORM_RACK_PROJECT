import Mens from "../assets/mens.jpeg";
import Kids from "../assets/kids.jpeg";
import Shoes from "../assets/Shoes.jpeg";
import watches from "../assets/watches.jpeg";
import womenBag from "../assets/womenbags.jpeg";
import womenJewelery from "../assets/women_jewelery.jpeg";
import womenOfficeLook from "../assets/women_officelooks.jpeg";
import womenOutwear from "../assets/women_Outwear.jpeg";
import womenWinter from "../assets/womens_winter_collection.jpeg";
import "../App.css";
import Slider from "react-slick";

const Shopping = () => {
  const collection = [
    {
      src: Mens,
      title: "mensCollection",
      desc: "Men's Bestsellers Up to 65% Off Event ends in 8 hours and 47 minutes",
    },
    {
      src: Kids,
      title: "kidsCollection",
      desc: "Kids' Fall Looks Up to 60% Off Event ends in 1 day, 8 hours, and 41 minutes",
    },
    {
      src: Shoes,
      title: "shoesCollection",
      desc: "New-In Mens Sneakers Up to 50% Off Event ends in 8 hours and 47 minutes",
    },
    {
      src: watches,
      title: "watchesCollection",
      desc: "New-to-Rack Black-Owned Brand: SPGBK Watches Event ends in 8 hours and 47 minutes Up to 65% Off Event ends in 8 hours and 47 minutes",
    },
    {
      src: womenBag,
      title: "womenBagCollection",
      desc: "Kate Spade New York Handbags & More Up to 65% Off Event ends in 8 hours and 45 minutes",
    },
    {
      src: womenOutwear,
      title: "womenOutwearCollection",
      desc: "Women’s Fall Outerwear, Boots & More Up to 60% Off Event ends in 1 day, 8 hours, and 41 minutes",
    },
    {
      src: womenJewelery,
      title: "womenJeweleryCollection",
      desc: "New-In Bony Levy Fine Jewelry Up to 50% Off Event ends in 8 hours and 45 minutes",
    },
    {
      src: womenOfficeLook,
      title: "womenOfficeLookCollection",
      desc: "Women's Office Looks for Fall Up to 65% Off Event ends in 1 day, 8 hours, and 42 minutes",
    },
    {
      src: womenWinter,
      title: "womenWinterCollection",
      desc: "Women's Sweaters Up to 65% Off Event ends in 1 day, 8 hours, and 42 minutes",
    },
  ];

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
          slidesToShow: 2,
          slidesToScroll: 2,
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
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="top-brands-slider">
      <Slider {...settings}>
        {collection && collection.length
          ? collection.map((imageItem) => (
              <div key={imageItem.title} className="slide">
                <div className="slide-content">
                  <img
                    src={imageItem.src}
                    alt={imageItem.title}
                    className="square-image"
                  />
                </div>
                <h4>{imageItem.desc}</h4>
              </div>
            ))
          : null}
      </Slider>
    </div>
  );
};

export default Shopping;
