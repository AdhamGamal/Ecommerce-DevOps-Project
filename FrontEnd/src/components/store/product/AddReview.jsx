import React from "react";
import StarRating from "../../UI/StarRating";
import Button from "../../UI/Button";

const AddReview = () => {
  return (
    <>
      <div className="mt-6 p-4 bg-light-color">
        <h3 className="text-2xl font-bold mb-2 text-secondary-color">
          Write a Review
        </h3>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                fill="#e5e7eb"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer hover:fill-secondary-color"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.29 7.02h7.392c.967 0 1.372 1.24.588 1.81l-5.993 4.349 2.29 7.02c.3.921-.755 1.688-1.54 1.11L12 18.347l-5.993 4.349c-.785.578-1.84-.189-1.54-1.11l2.29-7.02-5.993-4.349c-.784-.57-.38-1.81.588-1.81h7.392l2.29-7.02z"
                />
              </svg>
            ))}
          </div>
          <input
            className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-200"
            placeholder="Review Title"
          ></input>
          <textarea
            className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-200"
            rows={6}
            placeholder="Your review..."
          ></textarea>
        </div>
        <Button
          primary={false}
          onClick={() => handleShowMore(index)}
          className="mt-4 px-4 py-2 bg-primary-color text-white rounded-md hover:bg-secondary-color transition w-full"
        >
          Submit Review
        </Button>
      </div>
    </>
  );
};

export default AddReview;
