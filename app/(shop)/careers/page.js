import React from "react";

const Careers = () => {
  // This would be populated with real job listings
  const jobListings = [
    {
      id: 1,
      title: "Product Manager",
      description:
        "Lead our product development initiatives and help us grow our platform to the next level.",
      qualifications: [
        "Experience in product management or a related field.",
        "Strong organizational and project management skills.",
        "Excellent communication skills.",
      ],
    },
    {
      id: 2,
      title: "Frontend Developer",
      description:
        "Create engaging and responsive interfaces for our customers, making pet care a breeze.",
      qualifications: [
        "Proficient in React.js and Tailwind CSS.",
        "Experience with responsive and cross-browser development.",
        "Familiarity with modern front-end build pipelines and tools.",
      ],
    },
  ];

  return (
    <div className="bg-white py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
          Join Our Team
        </h1>
        <p className="text-gray-600 mb-6">
          PetPlus is a leading e-commerce store dedicated to pet lovers and
          their furry friends. We are always looking for passionate individuals
          to join our growing team. Explore our career opportunities and help us
          make the lives of pets and their owners even better.
        </p>

        {jobListings.map((job) => (
          <div key={job.id} className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {job.title}
            </h2>
            <p className="text-gray-600 mb-3">{job.description}</p>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Qualifications:
            </h3>
            <ul className="list-disc list-inside text-gray-600 mb-6">
              {job.qualifications.map((qual, index) => (
                <li key={index}>{qual}</li>
              ))}
            </ul>
            {/* The Apply Now button is just for show and has no functionality */}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Careers;
