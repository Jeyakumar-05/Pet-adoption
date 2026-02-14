import React from "react";
import { XIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { updatePetStatus } from "../services/api";
import { toast } from "sonner";
import { useState } from "react";

const PetCard = ({ pet, onDelete }) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const isAdmin = userData?.role === "admin";
  const [status, setStatus] = useState(pet.status || "available");

  const handleStatusChange = async (newStatus) => {
    try {
      await updatePetStatus(pet.id, newStatus);
      setStatus(newStatus);
      toast.success(`Pet status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden relative">
      <div className="absolute top-2 right-2 z-10">
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm ${status === "adopted"
            ? "bg-gray-100 text-gray-600 border border-gray-200"
            : "bg-green-100 text-green-700 border border-green-200"
            }`}
        >
          {status}
        </span>
      </div>

      <img
        src={pet.image}
        alt={pet.name}
        className={`w-full h-48 object-cover ${status === "adopted" ? "grayscale opacity-80" : ""
          }`}
      />

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{pet.name}</h2>
        <p className="text-gray-600">Pet ID: {pet.id}</p>
        <p className="text-gray-600">Breed: {pet.breed}</p>
        <p className="text-gray-600">Age: {pet.age} years</p>

        {isAdmin && (
          <div className="mt-3">
            <label className="text-xs font-semibold text-gray-500 uppercase">
              Admin Status Control
            </label>
            <select
              value={status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full mt-1 p-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="available">Available</option>
              <option value="adopted">Adopted</option>
            </select>
          </div>
        )}

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          {!isAdmin && (
            <Link
              to={status === "adopted" ? "#" : "/contact"}
              state={{ petId: pet.id, petName: pet.name }}
              className={`flex-1 text-center py-2 px-4 rounded-lg font-medium transition-colors ${status === "adopted"
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-orange-500 text-white hover:bg-orange-600 shadow-md hover:shadow-lg"
                }`}
              onClick={(e) => status === "adopted" && e.preventDefault()}
            >
              {status === "adopted" ? "Adopted" : "Adopt Me"}
            </Link>
          )}

          {isAdmin && (
            <button
              onClick={() => onDelete(pet.name)}
              className="w-full bg-red-100 text-red-600 py-2 rounded-lg hover:bg-red-200 transition-colors flex justify-center items-center font-medium"
              title="Delete Pet"
            >
              <XIcon size={18} className="mr-2" />
              Delete Pet
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetCard;
