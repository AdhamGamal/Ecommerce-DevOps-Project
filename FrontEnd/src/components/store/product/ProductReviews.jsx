import React from "react";
import StarRating from "../../UI/StarRating";
import AddReview from "./AddReview";

const ProductReviews = ({ product }) => {
  // Calculate the total number of reviews
  const totalReviews = product.reviews.length;

  // Calculate the average rating
  const averageRating =
    product.reviews.reduce((sum, review) => sum + review.rating, 0) /
    totalReviews;

  // Count the number of reviews for each star rating
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  product.reviews.forEach((review) => {
    ratingCounts[review.rating]++;
  });

  return (
    <div className="p-4 mt-5">
      <div>
        <h2 className=" border-b-2  border-secondary-color pb-2 text-4xl font-bold mb-4 text-secondary-color ">
          Verified Customer Feedback
        </h2>
      </div>
      <div className=" grid grid-cols-1 lg:grid-cols-3 ">
        {/* all retaing and add review */}
        <div className="flex  flex-col  ">
          {/* Verified Ratings Section */}
          <div className="mb-8  p-5 bg-light-color  mx-auto h-fit  w-[50%] lg:w-[90%]">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl font-bold text-secondary-color">
                {averageRating.toFixed(1)}/5
              </span>
              <StarRating rating={averageRating} />
            </div>
            <p className="text-text-color mb-4">
              {totalReviews} verified ratings
            </p>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-secondary-color">{star} ★</span>
                  <div className="w-48 bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-yellow-400 h-2.5 rounded-full"
                      style={{
                        width: `${(ratingCounts[star] / totalReviews) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-text-color">
                    ({ratingCounts[star]})
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* add review  */}
        </div>

        {/* Product Reviews Section */}
        <div className="flex flex-col col-span-2">
          <h2 className="text-2xl font-semibold mb-1 text-text-color">
            PRODUCT REVIEWS ({totalReviews})
          </h2>
          <div className="grid grid-cols-1  ">
            {product.reviews.map((review, index) => (
              <div
                key={index}
                className="border-b-2 border-gray-200 p-4   mb-2 shadow-sm"
              >
                <div className="flex flex-col items-start gap-1 ">
                  {/* <div className="bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full">
                    {review.name.charAt(0)}
                  </div> */}
                  <h3 className="font-bold text-lg text-secondary-color">
                    {review.name}
                  </h3>
                  <div className="  text-gray-600">{review.createdAt}</div>
                  <div className="flex items-center gap-1 mb-2">
                    <StarRating rating={review.rating} />
                  </div>
                </div>

                <h2 className="text-text-color font-bold">{review.title}</h2>
                <p className=" text-gray-400">{review.review}</p>
              </div>
            ))}
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default ProductReviews;
