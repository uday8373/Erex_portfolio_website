import React from "react";

export default function BlogDetailsLoading() {
  return (
    <>
      {[...Array(1)]?.map((item, index) => (
        <div
          key={index}
          role="status"
          className="w-full py-8 animate-pulse md:flex-col md:flex ">
          <div className="w-full">
            <div className="h-4 mb-6 bg-gray-200 rounded-full w-36 dark:bg-gray-700"></div>
            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700  max-w-[700px] mb-2.5"></div>
            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[750px] mb-2.5"></div>
            <div className="h-5 mb-6 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[650px] "></div>
            <div className="flex items-center justify-center w-full bg-gray-300 rounded h-96 dark:bg-gray-700">
              <svg
                className="w-20 h-20 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18">
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
