import Slider from "react-slick";
import VideoPlayer from "../components/VideoPlayer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const VideoSlideshow = () => {
  const slides = [
    {
      id: 1,
      videoUrl: `https://cdn.dashhudson.com/media/full/1694042655.438735257278.mp4`,
    },
    {
      id: 2,
      videoUrl: `https://cdn.dashhudson.com/media/full/1656647074.062464536274.mp4`,
    },
    {
      id: 3,
      videoUrl: `https://cdn.dashhudson.com/media/full/1706134383.915505438559.mp4`,
    },
    {
      id: 4,
      videoUrl: `https://cdn.dashhudson.com/media/full/1708123697.04083216446.mp4`,
    },
    {
      id: 5,
      videoUrl: `https://cdn.dashhudson.com/media/full/1694042566.350712868480.mp4`,
    },
    {
      id: 6,
      videoUrl: `https://cdn.dashhudson.com/media/full/1645552568.283103792945.mp4`,
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
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
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
    <div
      className="slider-container"
      style={{
        width: "90%",
        margin: "auto",
        cursor: "pointer",
        marginBottom: "100px",
        marginTop: "50px",
      }}
    >
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} style={{ position: "relative" }}>
            <VideoPlayer
              src={slide.videoUrl}
              width={300}
              height={200}
              style={{
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            />
            <button
              style={{
                position: "absolute",
                bottom: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                padding: "8px 16px",
                cursor: "pointer",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
            ></button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default VideoSlideshow;
