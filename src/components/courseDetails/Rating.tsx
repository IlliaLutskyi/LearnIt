"use client";
import React, { useState } from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";

const Rating = () => {
  const [rating, setRating] = useState(0);
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex gap-2 items-center">
      {stars.map((star) => {
        return (
          <button>
            {rating >= star ? (
              <FaStar color="yellow" className="text-purple-700" />
            ) : rating >= star - 0.5 ? (
              <FaStarHalfAlt color="yellow" className="text-purple-700" />
            ) : (
              <CiStar className="text-purple-700" />
            )}
          </button>
        );
      })}
      <span className="text-xs">{rating}/5</span>
    </div>
  );
};

export default Rating;
