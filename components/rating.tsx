"use client";
import { useState } from "react";
import { StarRating } from "react-flexible-star-rating";

export default function Rating({ initialRate }: { initialRate: number }) {
  const [rating, setRating] = useState<number>(initialRate);
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const normalizedRating = (rating: number) => Math.round(rating * 2) / 2;
  return (
    <StarRating
      initialRating={normalizedRating(rating)}
      isHalfRatingEnabled
      dimension={6}
      onRatingChange={handleRatingChange}
    />
  );
}
