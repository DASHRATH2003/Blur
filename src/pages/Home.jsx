import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon } from "@heroicons/react/24/outline";
import { fragranceCollections } from "../data/fragrances";
import homepage1 from "../assets/homepage1.webp";
import homepage2 from "../assets/homepage2.webp";
import homepage3 from "../assets/homepage3.webp";
import homepage4 from "../assets/homepage4.webp";
import { PlayIcon as SolidPlayIcon } from "@heroicons/react/24/solid";
import discoveryImg from "../assets/Discovery.jpg";
import luxuryImg from "../assets/Laxury.jpeg";
import foreveryImg from "../assets/Forevery.jpg";
import loveImg from "../assets/love.webp";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const [videoMessage, setVideoMessage] = useState('');
  const scrollContainerRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const slides = [
    {
      title: "Discover Your Signature Scent",
      description: "Explore our collection of unique fragrances crafted to express your personality.",
      image: discoveryImg,
    },
    {
      title: "Luxury in Every Drop",
      description: "Experience the art of perfumery with our premium collection.",
      image: luxuryImg,
    },
    {
      title: "For Every Moment",
      description: "From day to night, find the perfect scent for every occasion.",
      image: foreveryImg,
    },
    {
      title: "Crafted with Love",
      description: "Each fragrance tells a story, what will yours be?",
      image: loveImg,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  // Auto-scroll for homepage images
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollWidth = container.scrollWidth - container.clientWidth;
    const scrollInterval = setInterval(() => {
      setScrollPosition((prevPosition) => {
        const newPosition = prevPosition + 1;
        // Reset to start when reaching the end
        if (newPosition >= scrollWidth) {
          return 0;
        }
        return newPosition;
      });
    }, 50); // Adjust this value to control scroll speed (higher = slower)

    return () => clearInterval(scrollInterval);
  }, []);

  // Apply scroll position
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollPosition;
    }
  }, [scrollPosition]);

  const FragranceCard = ({ fragrance }) => (
    <div className="w-[300px] group">
      <Link to={`/product/${fragrance.id}`}>
        <div className="relative flex flex-col">
          <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-4 group-hover:shadow-lg transition-shadow duration-300">
            <img
              src={fragrance.image}
              alt={fragrance.name}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-medium text-gray-900 group-hover:text-pink-500 transition-colors duration-200">
              {fragrance.name}
            </h3>
            <p className="text-sm text-gray-500">{fragrance.description}</p>
            <div className="flex flex-wrap gap-2">
              {fragrance.vibe.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-2">
              <span className="text-lg font-medium text-gray-900">₹{fragrance.price}</span>
            </div>
            <div className="mt-2 space-y-2 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <span className="font-medium">Family:</span>
                <span>{fragrance.family}</span>
              </div>
              <div>
                <span className="font-medium">Top Notes:</span> {fragrance.notes.top.join(', ')}
              </div>
            </div>
            <button className="mt-4 w-full bg-black text-white py-2 px-4 text-sm font-medium hover:bg-gray-800 transition-colors duration-200 rounded">
              ADD TO CART
            </button>
          </div>
        </div>
      </Link>
    </div>
  );

  // Combine all fragrances into a single array
  const allFragrances = [
    ...fragranceCollections.mens.map(item => ({ ...item, collection: "Men's" })),
    ...fragranceCollections.womens.map(item => ({ ...item, collection: "Women's" })),
    ...fragranceCollections.sugar.map(item => ({ ...item, collection: "Sugar Muse" }))
  ];

  // Homepage images array
  const homepageImages = [
    { image: homepage1, alt: "Homepage 1" },
    { image: homepage2, alt: "Homepage 2" },
    { image: homepage3, alt: "Homepage 3" },
    { image: homepage4, alt: "Homepage 4" }
  ];

  // Brand logos data
  const brands = [
    { name: "Chanel", text: "CHANEL" },
    { name: "Dior", text: "DIOR" },
    { name: "Gucci", text: "GUCCI" },
    { name: "Tom Ford", text: "TOM FORD" },
    { name: "Jo Malone", text: "JO MALONE" },
    { name: "Hermès", text: "HERMÈS" },
    { name: "Versace", text: "VERSACE" },
    { name: "YSL", text: "YVES SAINT LAURENT" }
  ];

  useEffect(() => {
    // Log when component mounts
    console.log("Video component mounted");
    
    // Check if video file exists
    fetch('/videoperfume.mp4')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Video file exists and is accessible");
        setVideoMessage("Video file found successfully");
      })
      .catch(error => {
        console.error("Error checking video file:", error);
        setVideoMessage(`Error finding video file: ${error.message}`);
        setVideoError(true);
      });
  }, []);

  // Video error handler with more detailed error reporting
  const handleVideoError = (e) => {
    console.error("Video error:", e);
    const video = videoRef.current;
    let errorMessage = "Error loading video. ";
    
    if (video) {
      errorMessage += `Network State: ${video.networkState}, `;
      errorMessage += `Ready State: ${video.readyState}, `;
      errorMessage += `Error Code: ${video.error ? video.error.code : 'none'}, `;
      errorMessage += `Source: ${video.currentSrc || 'none'}`;
    }
    
    setVideoMessage(errorMessage);
    setVideoError(true);
  };

  // Video loaded handler
  const handleVideoLoaded = () => {
    console.log("Video loaded successfully");
    setVideoError(false);
    setVideoMessage('Video loaded successfully!');
    
    // Try to play the video
    const playVideo = async () => {
      try {
        await videoRef.current.play();
        console.log("Video playing");
      } catch (err) {
        console.error("Error playing video:", err);
        setVideoMessage(`Error playing video: ${err.message}`);
      }
    };
    
    playVideo();
  };

  const handleVideoClick = () => {
    if (!showVideo) {
      setShowVideo(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play();
          setIsPlaying(true);
        }
      }, 100);
      return;
    }

    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="space-y-16">
      {/* Hero Section with Carousel */}
      <div className="relative bg-white h-[500px] overflow-hidden">
        {/* Carousel Container */}
        <div
          className="flex transition-transform duration-500 ease-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.title}
              className="w-full h-full flex-shrink-0 grid grid-cols-2"
            >
              {/* Left Content Side */}
              <div className="flex flex-col justify-center items-start px-28 pt-8 pb-32 bg-white">
                <h1 className="text-3xl md:text-2xl font-semibold tracking-tight text-gray-600 mb-3">
                  {slide.title}
                </h1>
                <h2 className="text-1xl md:text-1xl font-semibold tracking-tight text-gray-600 mb-6">
                  {slide.description}
                </h2>
                <Link
                  to="/shop"
                  className="inline-block bg-pink-100 hover:bg-pink-200 text-black py-2.5 px-10 text-lg font-medium transition-colors duration-200"
                >
                  SHOP NOW
                </Link>
              </div>

              {/* Right Image Side */}
              <div className="relative h-[350px]">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="absolute top-96 left-1/2 transform -translate-x-1/2 flex space-x-1.5 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                currentSlide === index ? "bg-black w-3" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Video Section with Cover Design */}
      
      {/* All Collections in Single Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <section>
            <div className="flex items-center justify-between mb-8 -mt-16 ">
              <div>
                <h2 className="text-3xl font-bold text-gray-900  ">All Collections</h2>
                <p className="mt-2 text-gray-500">Explore our complete range of fragrances</p>
              </div>
              <Link 
                to="/shop" 
                className="text-pink-500 hover:text-pink-600 font-medium flex items-center"
              >
                View All →
              </Link>
            </div>
            <div className="relative">
              <div className="overflow-x-auto hide-scrollbar">
                <div className="inline-flex space-x-8 pb-4">
                  {allFragrances.map((fragrance) => (
                    <div key={fragrance.id} className="relative">
                      <span className="absolute top-2 left-2 bg-black/75 text-white px-3 py-1 text-xs rounded-full">
                        {fragrance.collection}
                      </span>
                      <FragranceCard fragrance={fragrance} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Homepage Images Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto hide-scrollbar scroll-smooth"
          >
            <div className="inline-flex space-x-4">
              {[...homepageImages, ...homepageImages].map((item, index) => (
                <div 
                  key={index} 
                  className="w-[calc(50vw-2rem)] max-w-[600px] flex-shrink-0"
                >
                  <div className="aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Rotating Brands Section */}
      <div className="w-full bg-pink-50 py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {/* First row - moving right */}
            <div className="flex animate-marquee whitespace-nowrap">
              {[...brands, ...brands].map((brand, index) => (
                <div
                  key={index}
                  className="mx-8 flex items-center justify-center"
                >
                  <span className="text-2xl font-serif text-gray-800 hover:text-pink-600 transition-colors duration-300">
                    {brand.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Second row - moving left */}
            <div className="flex animate-marquee2 whitespace-nowrap mt-8">
              {[...brands.reverse(), ...brands].map((brand, index) => (
                <div
                  key={index}
                  className="mx-8 flex items-center justify-center"
                >
                  <span className="text-2xl font-serif text-gray-800 hover:text-pink-600 transition-colors duration-300">
                    {brand.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Experience Our Latest Collection</h2>
          <div className="flex justify-center space-x-4 mb-6">
            <div className="w-16 h-[2px] bg-pink-200"></div>
            <div className="w-16 h-[2px] bg-pink-300"></div>
            <div className="w-16 h-[2px] bg-pink-400"></div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the art of perfumery through our curated collection of exquisite fragrances
          </p>
        </div>

        <div 
          className="relative rounded-lg overflow-hidden shadow-xl cursor-pointer transition-all duration-500"
          onClick={handleVideoClick}
        >
          {/* Cover Design (shown when video is hidden) */}
          {!showVideo && (
            <div className="relative">
              <div className="aspect-video bg-gradient-to-r from-pink-100 to-purple-100 flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('/src/assets/Luxuryperfume.jpeg')] bg-cover bg-center opacity-20"></div>
                <div className="relative z-10 text-center p-8">
                  <div className="mb-6">
                    <div className="w-20 h-20 rounded-full bg-white bg-opacity-90 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <SolidPlayIcon className="w-10 h-10 text-pink-500" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                    Watch Our Story
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Click to explore the artistry and passion behind our exclusive fragrance collection
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Video (hidden initially) */}
          <div className={`transition-all duration-500 ${showVideo ? 'opacity-100' : 'opacity-0 hidden'}`}>
            <video 
              ref={videoRef}
              className="w-full h-auto"
              loop 
              muted 
              playsInline
              controls={isPlaying}
              preload="auto"
              onError={handleVideoError}
              onLoadedData={handleVideoLoaded}
            >
              <source 
                src="videoperfume.mp4" 
                type="video/mp4" 
              />
              Your browser does not support the video tag.
            </video>
            {videoMessage && (
              <div className={`text-center mt-2 p-2 ${videoError ? 'text-red-500' : 'text-green-500'}`}>
                {videoMessage}
              </div>
            )}
          </div>
        </div>
      </div>


      {/* Newsletter Section */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Subscribe to our newsletter
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Get the latest updates on new products and upcoming sales.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <input
                  type="email"
                  className="px-5 py-3 border border-transparent text-base font-medium rounded-l-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  placeholder="Enter your email"
                />
                <button className="px-5 py-3 border border-transparent text-base font-medium rounded-r-md text-white bg-purple-600 hover:bg-purple-700">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
