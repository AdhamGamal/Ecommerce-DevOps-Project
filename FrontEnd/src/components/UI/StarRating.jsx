import React from "react";

const StarRating = ({ rating }) => {
  const maxStars = 5;

  const getStarIcon = (index) => {
    const starValue = index + 1; // Star values are 1, 2, 3, 4, 5
    const fillPercentage = Math.min(Math.max(rating - index, 0), 1) * 100; // Calculate fill percentage

    if (fillPercentage === 100) {
      // Full star
      return (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 text-secondary-color"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    } else if (fillPercentage > 0) {
      // Partial star
      return (
        <div key={index} className="relative w-5 h-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="absolute top-0 left-0 w-full h-full text-gray-300"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="absolute top-0 left-0 w-full h-full text-secondary-color"
            style={{
              clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`,
            }}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      );
    } else {
      // Empty star
      return (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 text-gray-300"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    }
  };

  return (
    <div className="flex">
      {Array.from({ length: maxStars }, (_, i) => getStarIcon(i))}
    </div>
  );
};

export default StarRating;
