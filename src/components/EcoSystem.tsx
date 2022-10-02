import { useEffect, useState, CSSProperties } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'react-responsive-carousel';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import Slider from "react-slick";

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };

const EcoSystem = () => {
//   const [slidercouter, setSliderCounter] = useState(3);
//   const [windowDimension, setWindowDimension] = useState([]);
//   const getWindowDimensions = () => {
//     const { innerWidth: width, innerHeight: height } = window;
//     if (width > 1023) {
//       setSliderCounter(3);
//     } else if (width > 767) {
//       setSliderCounter(2);
//     } else {
//       setSliderCounter(1);
//     }
//     setWindowDimension([width, height]);
//   };

//   useEffect(() => {
//     getWindowDimensions();
//   }, []);

//   var settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: {slidercouter},
//   };
  
  return (
    <div>
        <div className="lg:hidden">
        {/* <Slider {...settings}> */}
            <Carousel responsive={responsive}>
                <div className="p-20">1</div>
                <div className="p-20">2</div>
                <div className="p-20">3</div>
                <div className="p-20">4</div>
                <div className="p-20">5</div>
                <div className="p-20">6</div>
            </Carousel>
        {/* </Slider> */}
        </div>
    </div>
  );
};

export default EcoSystem;
