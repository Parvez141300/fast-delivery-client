import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  // Default map center (Dhaka)
  const defaultCenter = [23.8103, 90.4125];

  // Dynamic contact information
  const contactInfo = {
    company: {
      name: "SwiftDrop Delivery",
      description:
        "Get in touch with us. We're here to help with all your delivery needs.",
    },
    contactMethods: [
      {
        icon: "📞",
        title: "Call Us",
        details: "+880 1XXX-XXXXXX",
        description: "Mon-Sun: 8:00 AM - 11:00 PM",
      },
      {
        icon: "✉️",
        title: "Email Us",
        details: "support@swiftdrop.com",
        description: "We'll respond within 24 hours",
      },
      {
        icon: "📍",
        title: "Visit Us",
        details: "123 Business Avenue, Dhaka 1212",
        description: "Bangladesh",
      },
      {
        icon: "🕒",
        title: "Business Hours",
        details: "24/7 Customer Support",
        description: "Delivery operations: 6AM - 10PM",
      },
    ],
    offices: [
      {
        city: "Dhaka Head Office",
        address: "123 Business Avenue, Dhaka 1212",
        phone: "+880 1XXX-XXXXXX",
        email: "dhaka@gmail.com",
        position: [23.8103, 90.4125],
      },
      {
        city: "Chattogram Branch",
        address: "456 Port Road, Chattogram 4000",
        phone: "+880 1XXX-XXXXXX",
        email: "chgong@gmail.com",
        position: [22.3569, 91.7832],
      },
      {
        city: "Sylhet Office",
        address: "789 Tea Garden Road, Sylhet 3100",
        phone: "+880 1XXX-XXXXXX",
        email: "sylhet@gmail.com",
        position: [24.891, 91.8697],
      },
      {
        city: "Khulna Branch",
        address: "321 Sundarban Road, Khulna 9000",
        phone: "+880 1XXX-XXXXXX",
        email: "khulna@gmail.com",
        position: [22.8456, 89.5403],
      },
    ],
    faqs: [
      {
        question: "What areas do you serve?",
        answer:
          "We currently serve all 64 districts of Bangladesh with door-to-door delivery services.",
      },
      {
        question: "What are your delivery hours?",
        answer:
          "We operate from 6:00 AM to 10:00 PM daily, including weekends and holidays.",
      },
      {
        question: "How can I track my parcel?",
        answer:
          "You can track your parcel in real-time using the tracking number provided after booking.",
      },
      {
        question: "Do you offer same-day delivery?",
        answer:
          "Yes, we offer same-day delivery in major cities for orders placed before 12:00 PM.",
      },
    ],
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Contact form data:", data);
    setIsSubmitting(false);
    reset();
    Swal.fire({
      title: "Thank you for your message! We will get back to you soon.",
      icon: "success",
      draggable: true,
    });
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="hero bg-gradient-to-r from-primary to-secondary text-white rounded-lg">
        <div className="hero-content text-center">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
            <p>{contactInfo.company.description}</p>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="py-16 bg-base-200">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactInfo.contactMethods.map((method, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-lg text-center"
              >
                <div className="card-body">
                  <div className="text-4xl mb-4">{method.icon}</div>
                  <h3 className="card-title justify-center text-lg mb-2">
                    {method.title}
                  </h3>
                  <p className="font-semibold text-primary mb-2">
                    {method.details}
                  </p>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form & Offices */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Contact Form */}
            <div>
              <h2 className="text-xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* name fields */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">First Name *</span>
                    </label>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="input input-bordered w-full"
                      {...register("firstName", {
                        required: "First name is required",
                      })}
                    />
                    {errors.firstName && (
                      <span className="text-red-500 text-sm">
                        {errors.firstName.message}
                      </span>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Last Name *</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="input input-bordered w-full"
                      {...register("lastName", {
                        required: "Last name is required",
                      })}
                    />
                    {errors.lastName && (
                      <span className="text-red-500 text-sm">
                        {errors.lastName.message}
                      </span>
                    )}
                  </div>
                </div>
                {/* email field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email *</span>
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="input input-bordered w-full"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                {/* phone field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Phone</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+8801XXXXXXXXX"
                    className="input input-bordered w-full"
                    {...register("phone")}
                  />
                </div>
                {/* subject field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Subject *</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    {...register("subject", {
                      required: "Subject is required",
                    })}
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="delivery">Delivery Issue</option>
                    <option value="partnership">Partnership</option>
                    <option value="career">Career Opportunity</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && (
                    <span className="text-red-500 text-sm">
                      {errors.subject.message}
                    </span>
                  )}
                </div>
                {/* message field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Message *</span>
                  </label>
                  <br />
                  <textarea
                    placeholder="Your message here..."
                    className="textarea textarea-bordered h-32 w-full"
                    {...register("message", {
                      required: "Message is required",
                    })}
                  ></textarea>
                  {errors.message && (
                    <span className="text-red-500 text-sm">
                      {errors.message.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>

            {/* Offices & FAQ */}
            <div className="space-y-12">
              {/* Offices */}
              <div>
                <h2 className="text-xl font-bold mb-6">Our Offices</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {contactInfo.offices.map((office, index) => (
                    <div key={index} className="card bg-base-100 shadow-lg">
                      <div className="card-body">
                        <h3 className="card-title text-lg">{office.city}</h3>
                        <p className="text-gray-600">{office.address}</p>
                        <p className="text-primary">📞 {office.phone}</p>
                        <p className="text-secondary text-wrap">
                          ✉️ {office.email}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {contactInfo.faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="collapse collapse-plus bg-base-200"
                    >
                      <input type="radio" name="faq-accordion" />
                      <div className="collapse-title text-lg font-medium">
                        {faq.question}
                      </div>
                      <div className="collapse-content">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-0">
          <div className="h-96 md:h-[500px] w-full">
            <MapContainer
              center={defaultCenter}
              zoom={7}
              style={{ height: "100%", width: "100%" }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {contactInfo.offices.map((office, index) => (
                <Marker key={index} position={office.position}>
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold text-lg text-primary">
                        {office.city}
                      </h3>
                      <p className="text-sm mt-1">📍 {office.address}</p>
                      <p className="text-sm">📞 {office.phone}</p>
                      <p className="text-sm">✉️ {office.email}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
