import React from 'react'
import Link from 'next/link'

const TermsPage = () => {
  return (
    <div className="max-w-screen-lg m-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
      <p className="text-lg mb-4">
        Welcome to PetPlus! Please read these terms and conditions carefully
        before using our services. By accessing or using PetPlus, you agree to
        be bound by these terms and conditions. If you do not agree to all of
        the terms and conditions, you may not access or use our services.
      </p>
      <h2 className="text-2xl font-bold mb-4">1. Service Overview</h2>
      <p className="text-lg mb-4">
        PetPlus is an e-commerce platform that allows users to purchase pet
        products and services. Our platform connects pet owners with various pet
        products, services, and vendors.
      </p>
      <h2 className="text-2xl font-bold mb-4">2. Account Registration</h2>
      <p className="text-lg mb-4">
        In order to access certain features of PetPlus, you may be required to
        create an account. You agree to provide accurate, current, and complete
        information during the registration process. You are responsible for
        maintaining the confidentiality of your account and password and for
        restricting access to your computer or mobile device.
      </p>
      <h2 className="text-2xl font-bold mb-4">3. User Conduct</h2>
      <p className="text-lg mb-4">
        You agree not to use PetPlus for any unlawful purpose or in violation of
        any applicable laws or regulations. You agree to comply with all
        applicable laws regarding online conduct and acceptable content.
      </p>
      <h2 className="text-2xl font-bold mb-4">4. Intellectual Property</h2>
      <p className="text-lg mb-4">
        The content, trademarks, logos, and other intellectual property on
        PetPlus are owned by us or our licensors and are protected by copyright
        and other intellectual property laws. You may not use our intellectual
        property without our prior written consent.
      </p>
      <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
      <p className="text-lg mb-4">
        We will not be liable for any damages, including but not limited to,
        direct, indirect, incidental, consequential, or punitive damages,
        arising out of your use of or inability to use PetPlus. We make no
        warranties or representations about the accuracy or completeness of the
        content on PetPlus or the content of any websites linked to PetPlus.
      </p>
      <h2 className="text-2xl font-bold mb-4">6. Governing Law</h2>
      <p className="text-lg mb-4">
        These terms and conditions are governed by the laws of the United
        States. Any disputes relating to these terms and conditions will be
        subject to the exclusive jurisdiction of the courts of the United
        States.
      </p>
      <h2 className="text-2xl font-bold mb-4">7. Contact Us</h2>
      <p className="text-lg mb-4">
        If you have any questions about these terms and conditions, please
        contact us at support@petplus.com.
      </p>
      <p className="text-lg mb-4">
        These terms and conditions were last updated on February 19, 2024.
      </p>
      <button onClick={() => window.history.back()} className="bg-blue-500 text-white font-bold px-4 py-2 rounded-lg items-center flex gap-2 hover:bg-blue-600">
        Back
      </button>
    </div>
  );
}

export default TermsPage