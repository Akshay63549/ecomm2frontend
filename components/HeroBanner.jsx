/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import slideImage1 from "../public/slide-1.png";
import slideImage2 from "../public/slide-2.png";
import slideImage3 from "../public/slide-3.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import { BiArrowBack } from "react-icons/bi";
import Image from "next/image";

const HeroBanner = () => {
  return (
    <div className="mt-4 relative rounded-2xl text-white text-[20px] w-full max-w-[95%] mx-auto ">
      <Carousel
        className="rounded-2xl"
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={true}
        showStatus={false}
        renderArrowPrev={(clickHandler, hasPrev) => (
          <div
            onClick={clickHandler}
            className="bg-transparent border-[2px] rounded-full border-white absolute left-5 top-[50%] translate-y-[-50%] md:right-[51px] bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-#393646 z-10 flex items-center justify-center cursor-pointer hover:opacity-100"
          >
            <BiArrowBack color="white" className="text-sm md:text-lg" />
          </div>
        )}
        renderArrowNext={(clickHandler, hasNext) => (
          <div
            onClick={clickHandler}
            className="absolute border-[2px] text-white border-white rounded-full right-5 top-[50%] translate-y-[-50%] w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-#393646 z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
          >
            <BiArrowBack
              color="white"
              className="rotate-180 text-sm md:text-lg"
            />
          </div>
        )}
      >
        <div>
          <Image
            className="w-full h-full rounded-2xl object-contain"
            src={slideImage1}
            alt="Picture of the author"
          />
          <div className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-normal bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90">
            Пазарувай сега
          </div>
        </div>

        <div>
          <Image
            src={slideImage2}
            className="w-full h-full rounded-2xl object-contain"
          />
          <div className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-normal bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90">
            Пазарувай сега
          </div>
        </div>

        <div>
          <Image
            src={slideImage3}
            className="w-full h-full rounded-2xl object-contain"
          />
          <div className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-normal bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90">
            Пазарувай сега
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default HeroBanner;
