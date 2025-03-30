import React from "react";
import { XIcon } from "lucide-react";
import { Link } from "react-router-dom";

const PetCard = ({ pet, onDelete, onAdopt }) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const isAdmin = userData?.role === "admin";

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={pet.image}
        alt={pet.name}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{pet.name}</h2>
        <p className="text-gray-600">Pet ID: {pet.id}</p>
        <p className="text-gray-600">Breed: {pet.breed}</p>
        <p className="text-gray-600">Age: {pet.age} years</p>

        <div className="flex justify-between items-center mt-4">
          <Link
            to="/contact"
            state={{ petId: pet.id, petName: pet.name }}
            className="bg-orange-500 text-white py-1 px-4 rounded-lg hover:bg-orange-500"
          >
            Adopt
          </Link>
          {isAdmin && (
            <button
              onClick={() => onDelete(pet.name)}
              className="bg-orange-500 text-white py-1 px-2 rounded-lg flex items-center hover:bg-orange-600"
            >
              <XIcon size={18} className="mr-2 rounded-lg" />
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetCard;
