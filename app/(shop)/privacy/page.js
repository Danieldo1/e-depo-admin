import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-white py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
          Privacy Policy
        </h1>
        <div className="mb-4 text-gray-600">
          <p className="mb-2">
            At PetPlus, we are committed to protecting the privacy and security
            of our customers and site visitors. The PetPlus team members are
            customers themselves, both of PetPlus and other internet sites. We
            therefore fully appreciate and respect the importance of data
            privacy and security on the internet.
          </p>
          <p className="mb-2">
            This policy explains how we handle and use your personal information
            and your rights in relation to that information. Under the GDPR of
            May 2018, we are required to ensure that you understand and consent
            to the collection of your data. By using our services, you agree to
            the use of the data that we collect in accordance with this Privacy
            Policy.
          </p>
        </div>

        {/* The sections below would be expanded with actual policy details. */}
        <section className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Information We Collect
          </h2>
          <p className="text-gray-600">
            {/* Details about information collection */}
            We collect information about you during the checkout process on our
            store.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            How We Use Your Information
          </h2>
          <p className="text-gray-600">
            {/* Details about the usage of information */}
            We may use the information we collect from you to fulfill your
            requests for products and services, personalize your experience, and
            offer you products, programs, or services that may be of interest to
            you.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Sharing of Your Information
          </h2>
          <p className="text-gray-600">
            {/* Details about sharing of information */}
            We will not share your personal information with any third party
            outside of our organization, other than as necessary to fulfill your
            request.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Your Rights</h2>
          <p className="text-gray-600">
            {/* Details about users' rights */}
            You have the right to access and update your personal information,
            as well as the right to request its deletion within the limits
            permitted by law.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Changes to Our Privacy Policy
          </h2>
          <p className="text-gray-600">
            {/* Details about policy changes */}
            We may update this privacy policy from time to time in order to
            reflect changes to our practices or for other operational, legal, or
            regulatory reasons.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Contact Us</h2>
          <p className="text-gray-600">
            {/* Contact Information */}
            For more information about our privacy practices, if you have
            questions, or if you would like to make a complaint, please contact
            us by e-mail at privacy@petplus.com or by mail using the details
            provided below.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
