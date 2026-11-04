import { useState } from "react";
import { Heart } from "lucide-react";
import type { CarDetails } from "../types/car";

type CardProps = {
  car: CarDetails;
  onViewDetails: (car: CarDetails) => void;
};

function Card({ car, onViewDetails }: CardProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  return (
    <div className="relative h-80 overflow-hidden rounded-xl bg-gray-800">
      <div className="relative h-64">
        <Heart
          className="absolute top-4 right-4 p-2 size-10 rounded-xl self-end bg-gray-700/50 cursor-pointer"
          fill={isFavorite ? "currentColor" : "none"}
          onClick={() => setIsFavorite(!isFavorite)}
        />
        <img
          src={car.image}
          alt="car"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-gray-800 via-gray-800/70 to-transparent" />
      </div>

      <div className="relative z-10 -mt-25 p-4">
        <h3 className="text-lg font-bold text-white">{car.name}</h3>
        <p className="text-sm text-gray-400">{car.category} • {car.brand}</p>
        <p className="mt-1 text-lg font-semibold text-white">$ {car.price.toLocaleString()}</p>
        <button
          onClick={() => onViewDetails(car)}
          className="w-full font-bold mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white cursor-pointer"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default Card;