import React from "react";
import { PawPrint, Cable, Truck, UserRoundSearch } from "lucide-react";

const CoreValues = () => {
  const values = [
    {
      title: "Quality Products",
      text: "We ensure all products are thoroughly vetted to enhance your pet’s health and wellbeing.",
      icon: <PawPrint />,
    },
    {
      title: "Expert Advice",
      text: "Our team provides the best industry advice for the care of your furry friends.",
      icon: <UserRoundSearch />,
    },
    {
      title: "Fast Shipping",
      text: "Speedy delivery to keep tails wagging with minimal wait times.",
      icon: <Truck />,
    },
    {
      title: "24/7 Support",
      text: "Our customer support is here around the clock to help with your queries.",
      icon: <Cable />,
    },
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
            Core Values
          </h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            What Sets PetPlus Apart
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Our commitment to excellence makes us the best friend of your best
            friends.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-4">
            {values.map((value, index) => (
              <div key={index} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    {value.icon}
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    {value.title}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {value.text}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default CoreValues;
