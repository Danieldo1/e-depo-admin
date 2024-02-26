import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
          Contact Us
        </h1>

        <div className="md:flex md:justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0 md:mr-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-gray-600 mb-4">
              Have any questions? Just write down your message and we will get
              back to you as soon as possible.
            </p>

            {/* Contact Form */}
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="John Doe"
                  disabled
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="john.doe@example.com"
                  disabled
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Your message..."
                  disabled
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                disabled
              >
                Submit
              </button>
            </form>
          </div>

          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Office
            </h2>
            <p className="text-gray-600 mb-4">
              PetPlus, Inc.
              <br />
              123 Pet Street
              <br />
              Furrytown, PT 12345
            </p>
            <p className="text-gray-600 mb-4">
              Email: contact@petplus.com
              <br />
              Phone: (123) 456-7890
            </p>

            {/* Placeholder for map or actual map if needed */}
            <div className="bg-gray-200 aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-4">
              <div className="flex justify-center items-center h-full">
                <iframe
                  width="520"
                  height="400"
                  frameborder="0"
                  scrolling="no"
                  marginheight="0"
                  marginwidth="0"
                  id="gmap_canvas"
                  src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=%20123%20pet%20+()&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                ></iframe>{" "}
                
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
