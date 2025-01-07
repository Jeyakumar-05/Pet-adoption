import React, { useEffect, useState } from 'react';
import PetCard from '../components/PetCard';
import AddComponent from '../components/AddComponent';
import { fetchPets, deletePet } from '../services/api';
import Navbar from '../components/Navbar';

const AdoptPage = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const loadPets = async () => {
      const petList = await fetchPets();
      setPets(petList);
    };
    loadPets();
  }, []);

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
        <AddComponent onAdd={handleAddPet} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} onDelete={handleDeletePet} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AdoptPage;