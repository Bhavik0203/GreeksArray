import React from "react";

const CTA = () => {
  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10 bg-gradient-to-r from-blue-700 mb-14 to-blue-500  p-6 flex flex-col justify-center overflow-hidden">
        <div className="grid md:grid-cols-2 justify-center items-center max-md:text-center  h-full">
          <div className="md:max-w-md mx-auto">
            <h2 className="text-white text-4xl md:text-5xl font-extrabold mb-6 md:!leading-[55px]">
              Try using our templates
            </h2>
            <p className="text-white text-base">
              Upgrade to our premium plan and supercharge your experience. Don't
              miss out!
            </p>
            <div className="mt-12">
              <button
                type="button"
                className="px-8 py-2 text-base tracking-wider font-semibold outline-none border border-white bg-white text-blue-500 hover:bg-transparent hover:text-white transition-all duration-300"
              >
                Try now
              </button>
            </div>
          </div>
          <div className="md:text-right">
            <img
              src="https://readymadeui.com/bg-image.webp"
              alt="Premium Benefits"
              className="object-cover"
              style={{ height: "300px", objectFit: "cover", width: "400px" }}
            />
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <div className="max-w-md ">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-12 text-left leading-10">
              Must Read
            </h2>
          </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-sm:gap-8">
        <div className="bg-white rounded overflow-hidden ">
          <img
            src="https://readymadeui.com/images/food33.webp"
            alt="Blog Post 3"
            className="w-full h-52 object-cover"
          />
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              Lorem Ipsum Sit Amet
            </h3>
            <p className="text-gray-500 text-sm">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore...
            </p>
            <p className="text-gray-800 text-[13px] font-semibold mt-4">
              08 April 2024
            </p>
            <a
              href="javascript:void(0);"
              className="mt-4 inline-block px-4 py-2 rounded tracking-wider bg-purple-600 hover:bg-purple-700 text-white text-[13px]"
            >
              Read More
            </a>
          </div>
        </div>
        <div className="bg-white rounded overflow-hidden">
          <img
            src="https://readymadeui.com/images/food44.webp"
            alt="Blog Post 3"
            className="w-full h-52 object-cover"
          />
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              Lorem Ipsum Sit Amet
            </h3>
            <p className="text-gray-500 text-sm">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore...
            </p>
            <p className="text-gray-800 text-[13px] font-semibold mt-4">
              08 April 2024
            </p>
            <a
              href="javascript:void(0);"
              className="mt-4 inline-block px-4 py-2 rounded tracking-wider bg-purple-600 hover:bg-purple-700 text-white text-[13px]"
            >
              Read More
            </a>
          </div>
        </div>
        <div className="bg-white rounded overflow-hidden">
          <img
            src="https://readymadeui.com/images/food55.webp"
            alt="Blog Post 3"
            className="w-full h-52 object-cover"
          />
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              Lorem Ipsum Sit Amet
            </h3>
            <p className="text-gray-500 text-sm">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore...
            </p>
            <p className="text-gray-800 text-[13px] font-semibold mt-4">
              08 April 2024
            </p>
            <a
              href="javascript:void(0);"
              className="mt-4 inline-block px-4 py-2 rounded tracking-wider bg-purple-600 hover:bg-purple-700 text-white text-[13px]"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default CTA;
