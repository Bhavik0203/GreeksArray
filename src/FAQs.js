import React, { useState } from "react";
import "./FAQs.css";

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is Medium?",
      answer: "Medium is a platform for sharing and discovering ideas, stories, and knowledge.",
    },
    {
      question: "How do I create a Medium account?",
      answer: "You can create an account using your email, Google, or social media platforms.",
    },
    {
      question: "Is Medium free to use?",
      answer: "Medium offers free articles, but some content is behind a paywall for members.",
    },
    {
      question: "How can I become a writer on Medium?",
      answer: "Anyone can write on Medium by creating an account and submitting stories for publication.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">{faq.question}</div>
            <div className="faq-answer">{activeIndex === index && faq.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
