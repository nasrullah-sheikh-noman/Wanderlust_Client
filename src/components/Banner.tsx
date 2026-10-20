"use client";

import { Separator } from "@heroui/react";
import { useEffect, useRef } from "react";

const Banner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2;
    }
  }, [])
  return (
    <div className="relative min-h-[700px] text-white flex flex-col justify-between items-center gap-5 overflow-hidden">
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/assets/banner_video.mp4" type="video/mp4" />
      </video>

      {/* Optional dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Main content */}
      <div className="relative z-10 p-10 text-center flex flex-1 justify-center flex-col items-center gap-3.5">
        <h1 className="text-5xl md:text-7xl">
          Discover Your <br /> Next Adventure
        </h1>

        <p className="text-lg md:text-2xl max-w-3xl">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="flex gap-5">
          <button className="uppercase bg-cyan-500 px-5 py-3 cursor-pointer">
            Explore Now
          </button>

          <button className="uppercase px-5 py-3 bg-white/50 cursor-pointer">
            View Destination
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="relative z-10 bg-white/30 backdrop-blur-sm flex flex-wrap justify-between gap-5 w-full items-center p-5">
        <div>
          <h3 className="text-sm">Location</h3>
          <p className="text-xs">Address, City or Zip</p>
        </div>

        <Separator variant="tertiary" orientation="vertical" />

        <div>
          <h3 className="text-sm">Date/Duration</h3>
          <p className="text-xs">Anytime/3 Days</p>
        </div>

        <Separator variant="tertiary" orientation="vertical" />

        <div>
          <h3 className="text-sm">Budget</h3>
          <p className="text-xs">$0-$3000</p>
        </div>

        <Separator variant="tertiary" orientation="vertical" />

        <div>
          <h3 className="text-sm">People</h3>
          <p className="text-xs">5-10</p>
        </div>

        <button className="bg-cyan-500 py-2 px-4">Search</button>
      </div>
    </div>
  );
};

export default Banner;