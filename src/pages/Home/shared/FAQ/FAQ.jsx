import React from "react";
import { FaQuestionCircle, FaHeadset } from "react-icons/fa";

const FAQ = () => {
  const faqs = [
    {
      question: "What areas do you deliver to?",
      answer:
        "We provide nationwide delivery coverage across all districts in Bangladesh. Our services include express delivery in major cities within 24-72 hours.",
    },
    {
      question: "How can I track my parcel?",
      answer:
        "You can track your parcel in real-time using our mobile app or website. Simply enter your tracking number to get live updates on your parcel's location.",
    },
    {
      question: "Is Cash on Delivery available everywhere?",
      answer:
        "Yes, we offer 100% Cash on Delivery service across all districts in Bangladesh. Your cash is handled securely with multiple payment verification methods.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept Cash on Delivery, mobile banking (bKash, Nagad, Rocket), credit/debit cards, and bank transfers.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "Our 24/7 call center is always available to assist you. You can reach us through our hotline, live chat, email, or by visiting our delivery hubs.",
    },
    {
      question: "What is your express delivery timing in Dhaka?",
      answer:
        "In Dhaka, our express delivery service ensures parcel delivery within 4-6 hours from pick-up to drop-off for same-day deliveries.",
    },
    {
      question: "Do you offer services for small businesses?",
      answer:
        "Absolutely! We have specialized SME packages with discounted rates, bulk shipping options, and customized logistics solutions.",
    },
    {
      question: "How can I return or exchange a product?",
      answer:
        "We offer comprehensive reverse logistics services. Contact our support team to initiate the return process for any products.",
    },
  ];

  return (
    <section className="bg-base-100 space-y-5">
      {/* Header Section */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-2 rounded-full text-sm font-semibold mb-4">
          <FaQuestionCircle className="w-4 h-4" />
          FAQ
        </div>
        <h2 className="text-3xl md:text-4xl font-bold">
          Frequently Asked Questions
        </h2>
        <p>
          Find quick answers to common questions <br /> about FastDelivery
          services.
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-5">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="collapse collapse-plus bg-base-200 border border-base-300"
          >
            <input type="radio" name="my-accordion" />
            <div className="collapse-title text-xl font-medium">
              {faq.question}
            </div>
            <div className="collapse-content">
              <p className="text-base-content/70">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
