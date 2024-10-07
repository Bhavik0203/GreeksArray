import React from 'react';
import Marquee from 'react-fast-marquee';
import classNames from 'classnames';

const reviews = [
  {
    // name: "Jack",
    // username: "@jack",
    body: "Step-by-Step Guide to Building Your First Full-Stack Application with MERN",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    // username: "@jill",
    body: "Return different types of content from ASP.NET Core MVC Action Result",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    // username: "@john",
    body: "ASP.NET MVC Core Controller Action Method and Types of Action Result",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    // username: "@jane",
    body: "Getting Started with ASP.NET Core Web API and Entity Framework",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    // username: "@jenny",
    body: "Get Azure Subscription, Tenant, Client ID, Client secret",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    // username: "@james",
    body: "Create and Connect Azure Linux VM with SSH Key Pair",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 1);
const secondRow = reviews.slice(1, reviews.length / 1);

const ReviewCard = ({ img, name, username, body }) => {
    return (
      <figure
        className="relative w-64 min-h-[120px]  cursor-pointer overflow-hidden justify-between rounded-xl mt-5 mb-6 border border-gray-300 bg-gray-100 p-4 hover:bg-gray-200 mx-2 flex flex-col justify-between"
      >
        <div className="flex items-center gap-4">
          <img className="rounded-full border border-gray-800" width="35" height="35" alt="" src={img} />
          <div className="flex flex-col">
            <figcaption className="text-sm font-medium text-gray-900">{name}</figcaption>
            <p className="text-xs font-medium text-gray-600">{username}</p>
          </div>
        </div>
        <blockquote className="mt-2 text-sm text-gray-800 body-content">{body}</blockquote>
      </figure>
    );
  };
  
  const Blogslider = () => {
    return (
      <div className="overflow-hidden bg-black">
        {/* Content Section */}
        <div className="text-center mb-8 mt-5">
        <h2 className="text-3xl text-white font-bold mb-4 mt-6">Latest blogs by Geeks</h2>
        <p className="text-lg text-white">Explore our latest articles from multiple categories</p>
      </div>
  
        {/* Blog Slider Section */}
        <div className="relative h-auto rounded-lg  border-gray-300 bg-black mt-5  p-4">
          <Marquee pauseOnHover className="[--duration:5s] flex gap-4">
            {firstRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:5s] flex gap-4">
            {secondRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3"></div>
        </div>
      </div>
    );
  };
  
  
export default Blogslider;
