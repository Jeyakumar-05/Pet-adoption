import React, { useEffect, useState } from "react";
import PetCard from "../components/PetCard";
import AddComponent from "../components/AddComponent";
import {
  fetchPets,
  deletePet,
  fetchContacts,
  acceptContactRequest,
  rejectContactRequest,
} from "../services/api";
import Navbar from "../components/Navbar";
import { toast } from "sonner";
import { Toaster } from "sonner";

const AdoptPage = () => {
  const [pets, setPets] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [processingAction, setProcessingAction] = useState(null); // { contactId, action: 'accept' | 'reject' }
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

  const handleAcceptRequest = async (contactId) => {
    setProcessingAction({ contactId, action: "accept" });
    try {
      await acceptContactRequest(contactId);
      toast.success("Acceptance email sent successfully! 🎉");
      // Remove the request from the list
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact._id !== contactId)
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to send acceptance email. Please try again.";
      toast.error(errorMessage);
    } finally {
      setProcessingAction(null);
    }
  };

  const handleRejectRequest = async (contactId) => {
    setProcessingAction({ contactId, action: "reject" });
    try {
      await rejectContactRequest(contactId);
      toast.success("Rejection email sent successfully.");
      // Remove the request from the list
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact._id !== contactId)
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to send rejection email. Please try again.";
      toast.error(errorMessage);
    } finally {
      setProcessingAction(null);
    }
  };

  return (
    <>
      <Navbar />
      <Toaster richColors position="top-center" expand={true} />
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
                    className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-semibold flex items-center justify-center">
                          {c.name?.charAt(0).toUpperCase()}
                        </div>

                        {/* User Info */}
                        <div>
                          <p className="font-semibold text-gray-900 leading-tight">
                            {c.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {c.email} · {c.phone}
                          </p>
                        </div>
                      </div>

                      {/* Timestamp */}
                      <span className="text-[11px] text-gray-400 whitespace-nowrap">
                        {new Date(c.createdAt).toLocaleString()}
                      </span>
                    </div>

                    {/* Pet Badge */}
                    {c.petName && (
                      <div className="mt-3">
                        <span className="inline-block bg-purple-100 text-purple-700 text-xs font-medium px-2.5 py-1 rounded-full">
                          🐾 {c.petName} {c.petId ? `(#${c.petId})` : ""}
                        </span>
                      </div>
                    )}

                    {/* Message */}
                    <div className="mt-3 bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {c.message}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 mt-4">
                      <button
                        onClick={() => handleAcceptRequest(c._id)}
                        disabled={
                          processingAction?.contactId === c._id &&
                          processingAction?.action === "accept"
                        }
                        className="
                      px-4 py-1.5 text-xs font-semibold
                      rounded-md
                      bg-green-600 text-white
                      hover:bg-green-700
                      disabled:bg-green-400
                      disabled:cursor-not-allowed
                      transition
                    "
                      >
                        {processingAction?.contactId === c._id &&
                          processingAction?.action === "accept" ? (
                          <span className="flex items-center gap-2">
                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Processing
                          </span>
                        ) : (
                          "Accept"
                        )}
                      </button>

                      <button
                        onClick={() => handleRejectRequest(c._id)}
                        disabled={
                          processingAction?.contactId === c._id &&
                          processingAction?.action === "reject"
                        }
                        className="
                      px-4 py-1.5 text-xs font-semibold
                      rounded-md
                      bg-red-800 text-white
                      hover:bg-red-900
                      disabled:bg-red-500
                      disabled:cursor-not-allowed
                      transition
                    "
                      >
                        {processingAction?.contactId === c._id &&
                          processingAction?.action === "reject" ? (
                          <span className="flex items-center gap-2">
                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Processing
                          </span>
                        ) : (
                          "Reject"
                        )}
                      </button>
                    </div>
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