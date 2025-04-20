// src/components/VehicleCard.js
import React from 'react';
import { Link } from 'react-router-dom';

function VehicleCard({ vehicle }) {
  return (
    <div className="border rounded-lg shadow hover:shadow-lg transition duration-200 p-4 bg-white">
      <h2 className="text-xl font-semibold">{vehicle.make} {vehicle.model}</h2>
      <p className="text-sm text-gray-600">Year: {vehicle.vehicle_year}</p>
      <p className="text-sm text-gray-600">Colour: {vehicle.colour}</p>
      <p className="text-sm text-gray-600">Mileage: {vehicle.mileage} km</p>
      <Link to={`/vehicles/${vehicle.MAL_NO}`} className="mt-2 inline-block text-blue-500 hover:underline">
        View Details
      </Link>
    </div>
  );
}

export default VehicleCard;
