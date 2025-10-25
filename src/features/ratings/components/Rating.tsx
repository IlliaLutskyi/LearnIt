"use client";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
type Props = {
  rating: number;
  starSize?: number;
  isRateValueShown?: boolean;
};
const Rating = ({ rating, starSize, isRateValueShown = false }: Props) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => {
        return (
          <p key={star}>
            {rating >= star ? (
              <FaStar
                className="text-orange-400"
                size={starSize ? starSize : 15}
              />
            ) : rating >= star - 0.5 ? (
              <FaStarHalfAlt
                className="text-orange-400"
                size={starSize ? starSize : 15}
              />
            ) : (
              <CiStar
                className="text-orange-400"
                size={starSize ? starSize : 15}
              />
            )}
          </p>
        );
      })}
      {isRateValueShown && (
        <span className="text-xs">{rating.toFixed(1)}/5</span>
      )}
    </div>
  );
};

export default Rating;
