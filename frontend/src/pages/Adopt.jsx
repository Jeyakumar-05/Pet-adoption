import React, { useEffect, useState } from "react";
import PetCard from "../components/PetCard";
import AddComponent from "../components/AddComponent";
import { fetchPets, deletePet, fetchContacts } from "../services/api";
import Navbar from "../components/Navbar";

const AdoptPage = () => {
  const [pets, setPets] = useState([]);
  const [contacts, setContacts] = useState([]);
  const userData = JSON.parse(localStorage.getItem("user"));
  const isAdmin = userData?.role === "admin";

  useEffect(() => {
    const loadPets = async () => {
      const petList = await fetchPets();
      setPets(petList);
    };
    loadPets();
  }, []);

  useEffect(() => {
    const loadContacts = async () => {
      if (isAdmin) {
        const contactList = await fetchContacts();
        setContacts(contactList);
      }
    };
    loadContacts();
  }, [isAdmin]);

  const handleAddPet = (newPet) => {
    setPets((prevPets) => [...prevPets, newPet]);
  };

  const handleDeletePet = async (name) => {
    const success = await deletePet(name);
    if (success) {
      setPets((prevPets) => prevPets.filter((pet) => pet.name !== name));
    }
  };

  return (
    <>
      <Navbar />
      <div className="adopt-page container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Adopt a Pet</h1>

        {isAdmin && <AddComponent onAdd={handleAddPet} />}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} onDelete={handleDeletePet} />
          ))}
        </div>

        {isAdmin && (
          <div className="bg-white shadow rounded-lg p-4 border border-gray-100 mt-10">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold">Recent Adoption Requests</h2>
              <span className="text-sm text-gray-500">
                {contacts.length} request{contacts.length !== 1 ? "s" : ""}
              </span>
            </div>
            {contacts.length === 0 ? (
              <p className="text-gray-500 text-sm">No requests yet.</p>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {contacts.map((c) => (
                  <div
                    key={c._id}
                    className="border border-gray-100 rounded-lg p-3 bg-gray-50"
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">{c.name}</p>
                        <p className="text-sm text-gray-600">
                          {c.email} · {c.phone}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(c.createdAt).toLocaleString()}
                      </span>
                    </div>
                    {c.petName && (
                      <p className="text-sm text-gray-700 mt-1">
                        Pet: {c.petName} {c.petId ? `(#${c.petId})` : ""}
                      </p>
                    )}
                    <p className="text-sm text-gray-700 mt-2">{c.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AdoptPage;