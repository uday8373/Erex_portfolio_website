import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import {GrNext} from "react-icons/gr";
// import {GrPrevious} from "react-icons/gr";
import {ourClient} from "@/app/constants";
import Image from "next/image";

export default function Slick({}) {
  const slider = React.useRef(null);
  const settings = {
    dots: false,
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
    <div className="relative w-full overflow-hidden">
      {/* <button
        className="absolute z-50 p-2 text-white -translate-y-1/2 rounded-full cursor-pointer md:text-2xl -right-5 top-1/2 md:right-0 bg-primary ring-sky-200 ring-4"
        onClick={() => slider?.current?.slickNext()}>
        <GrNext />
      </button>
      <button
        className="absolute z-30 p-2 text-white -translate-y-1/2 rounded-full cursor-pointer -left-5 md:text-2xl top-1/2 md:left-0 bg-primary ring-sky-200 ring-4"
        onClick={() => slider?.current?.slickPrev()}>
        <GrPrevious />
      </button> */}
      <Slider ref={slider} {...settings}>
        {ourClient.map((client, index) => (
          <div key={client.id}>
            <div className="flex items-center justify-center px-8 py-6 border-r-2 border-watermark">
              <Image src={client.icon} alt={client.title} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
