import React from "react";

const About = () => {
  return (
    <div className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
          About PetPlus
        </h1>
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            PetPlus started with a simple idea: to make pet care more accessible
            and affordable for everyone. We&apos;ve grown from a small,
            family-run business to a leading e-commerce platform that serves pet
            owners around the world.
          </p>
          <p className="text-gray-600">
            Our mission is to provide a one-stop shop for all your pet needs,
            from food and toys to grooming supplies and accessories. We&apos;re
            dedicated to improving the lives of pets and the people who love
            them.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="me.png"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-900">
                Daniil Speranskii
              </h3>
              <p className="text-indigo-600">CEO & Founder</p>
              <p className="text-gray-500 text-sm">
                Daniil has over 10 years of experience in the pet care industry
                and is passionate about animal welfare.
              </p>
            </div>

            <div className="text-center">
              <img
                src="modelorg.jpg"
                alt="Team Member"
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-900">Jane Doe</h3>
              <p className="text-indigo-600">CFO</p>
              <p className="text-gray-500 text-sm">
                Jane is an animal lover and has over 10 years of experience in
                the pet care industry.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          <ul className="list-disc pl-5 text-gray-600">
            <li>
              Commitment to Quality: We ensure all products meet high standards
              of quality and safety.
            </li>
            <li>
              Customer Focus: We prioritize customer satisfaction and are always
              here to help.
            </li>
            <li>
              Innovation: We embrace new ideas and technologies that can improve
              our services.
            </li>
            <li>
              Sustainability: We strive to operate in an environmentally
              responsible way.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600">
            Questions or feedback? Our customer support team is always ready to
            assist you. Reach out to us anytime at support@petplus.com.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
