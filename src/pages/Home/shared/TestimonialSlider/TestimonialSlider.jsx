import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  FaQuoteLeft,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const TestimonialSlider = () => {
  const testimonials = [
    {
      id: 1,
      name: "Awlad Hossain",
      position: "Senior Product Designer",
      rating: 5,
      comment:
        "FastDelivery has completely transformed how we handle our business shipments. The real-time tracking and reliable service have made logistics effortless for our team.",
      avatar: "AH",
    },
    {
      id: 2,
      name: "Nasir Uddin",
      position: "CEO, TechSolutions Ltd.",
      rating: 5,
      comment:
        "Outstanding service! The 24/7 customer support is incredible. They've never missed a deadline and their cash on delivery service is flawless.",
      avatar: "NU",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      position: "E-commerce Store Owner",
      rating: 5,
      comment:
        "As a small business owner, FastDelivery's nationwide coverage and affordable pricing have helped me expand my customer base across Bangladesh.",
      avatar: "SJ",
    },
    {
      id: 4,
      name: "Mohammad Rahman",
      position: "Logistics Manager",
      rating: 5,
      comment:
        "The fulfillment solutions and corporate services have streamlined our entire supply chain. Professional, reliable, and always on time.",
      avatar: "MR",
    },
    {
      id: 5,
      name: "Fatima Begum",
      position: "Online Seller",
      rating: 5,
      comment:
        "100% safe delivery guaranteed! My customers love the parcel tracking feature and I appreciate the secure cash handling.",
      avatar: "FB",
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="bg-gradient-to-br from-base-100 to-base-200">
      <div className="">
        {/* Header Section */}
        <div className="text-center space-y-5">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-2 rounded-full text-sm font-semibold mb-4">
            <FaQuoteLeft className="w-4 h-4" />
            Testimonial
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">
            What Our Customers Are Saying
          </h2>
          <p className="max-w-lg mx-auto">
            Don't just take our word for it. Here's what our valued customers
            have to say about their experience with FastDelivery.
          </p>
        </div>

        {/* Stats Section */}
        <div className="flex justify-center items-center gap-5 my-5">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">4.9/5</div>
            <div className="text-base-content/70">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-secondary mb-2">1000+</div>
            <div className="text-base-content/70">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">99%</div>
            <div className="text-base-content/70">Satisfaction Rate</div>
          </div>
        </div>

        {/* Swiper Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-16"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-base-100 rounded-lg shadow-xl p-8 h-full border border-base-300 hover:shadow-2xl transition-all duration-300">
                  {/* Quote Icon */}
                  <div className="text-primary mb-4">
                    <FaQuoteLeft className="w-8 h-8 opacity-20" />
                  </div>

                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Comment */}
                  <p className="text-base-content/80 leading-relaxed mb-6 italic">
                    "{testimonial.comment}"
                  </p>

                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-base-content">
                        {testimonial.name}
                      </h4>
                      <p className="text-base-content/70 text-sm">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button className="swiper-button-prev btn btn-circle btn-outline border-2">
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button className="swiper-button-next btn btn-circle btn-outline border-2">
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Custom Pagination */}
          <div className="swiper-pagination mt-8 !relative !bottom-0 flex justify-center gap-2"></div>
        </div>
      </div>

      {/* Custom Styles for Swiper */}
      <style jsx>{`
        .swiper-pagination-bullet {
          background: #d1d5db;
          opacity: 1;
          width: 12px;
          height: 12px;
        }
        .swiper-pagination-bullet-active {
          background: #3b82f6;
        }
        .swiper-button-disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </section>
  );
};

export default TestimonialSlider;
