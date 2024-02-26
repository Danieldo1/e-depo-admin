import React from "react";

const HelpCenter = () => {
  const faqs = [
    {
      question: "How do I track my order?",
      answer:
        "Once your order has been shipped, you will receive an email with a tracking number.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy on all items. Products must be returned unused and in their original packaging.",
    },
    {
      question: "How can I change or cancel my order?",
      answer:
        "Please contact our support team as soon as possible if you need to change or cancel your order.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship internationally. Shipping times and costs may vary depending on the destination.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept Visa, Mastercard, and American Express. You can also pay with PayPal.",
    },
    {
      question: "What if I have a problem with my order?",
      answer:
        "If you have a problem with your order, please contact our support team.",
    },
    {
      question: "What if I need help with my order?",
      answer:
        "If you need help with your order, please contact our support team.",
    },
    {
      question: "What if I need help with my account?",
      answer:
        "If you need help with your account, please contact our support team.",
    },
    {
      question: "What if I need help with my shipping?",
      answer:
        "If you need help with your shipping, please contact our support team.",
    },

  ];

  return (
    <div className="bg-white py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
          Help Center
        </h1>
        <p className="text-gray-600 mb-6">
          Have questions? We&apos;ve compiled a list of frequently asked
          questions to help you find the answers you need.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="p-4 border border-gray-300 rounded-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {faq.question}
              </h2>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
