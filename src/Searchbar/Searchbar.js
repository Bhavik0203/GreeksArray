// import React, { useState } from "react";

// const Searchbar = () => {
//   const categories = [
//     "ASP.NET",
//     "ASP.NET Core",
//     "ASP.MVC",
//     "Architecture",
//     "Microservices",
//     "Azure",
//     "SQL Server",
//     "Other Blogs",
//   ];

//   const [activeCategory, setActiveCategory] = useState(categories[0]);
//   const [startIndex, setStartIndex] = useState(0);
//   const itemsToShow = 5;

//   const handleNext = () => {
//     if (startIndex + itemsToShow < categories.length) {
//       setStartIndex(startIndex + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (startIndex > 0) {
//       setStartIndex(startIndex - 1);
//     }
//   };

//   return (
//     <div className="flex justify-between items-center pr-8 mt-5 mb-15 p-8">
     
//       {/* Search bar on the right side */}
//       <div className="flex justify-end items-center w-full mt-5 max-w-md">
//         <form action="/search" className="w-full px-4">
//           <div className="relative">
//             <form>
//               <input
//                 type="text"
//                 name="q"
//                 className="w-full border h-10 shadow p-4 rounded-full dark:text-gray-900 dark:bg-gray-200"
//                 placeholder="search"
//               />
//               <button type="submit">
//                 <svg
//                   className="text-teal-400 h-5 w-5 absolute top-2.5 right-3 fill-current dark:text-teal-500"
//                   xmlns="http://www.w3.org/2000/svg"
//                   xmlnsXlink="http://www.w3.org/1999/xlink"
//                   version="1.1"
//                   x="0px"
//                   y="0px"
//                   viewBox="0 0 56.966 56.966"
//                   style={{ enableBackground: "new 0 0 56.966 56.966" }}
//                   xmlSpace="preserve"
//                 >
//                   <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
//                 </svg>
//               </button>
//             </form>

//             <h2 className="mt-2 text-lg text-center font-bold">
//               Recommended Blogs
//             </h2>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Searchbar;
