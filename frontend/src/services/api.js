import axios from "axios";
// const API_URL = "http://localhost:7777";
const API_URL = "https://pet-adoption-asv5.onrender.com";

export const fetchPets = async () => {
  try {
    const response = await axios.get(`${API_URL}/pets`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching pets:', error);
    return [];
  }
};


export const addPet = async (pet) => {
  try {
    const response = await axios.post(`${API_URL}/pets`,pet, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding pet:", error);
    return null;
  }
};

export const deletePet = async (name) => {
  try {
    await axios.delete(`${API_URL}/pets/${name}`);
    return true;
  } catch (error) {
    console.error("Error deleting pet:", error);
    return false;
  }
};

export const submitContactForm = async (contactData) => {
  try {
    const response = await fetch(`${API_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error adding pet:", error);
    return null;
  }
};

export const api = axios.create({
  // baseURL: "http://localhost:7777/api/v1/user",
  baseURL: "https://pet-adoption-asv5.onrender.com/api/v1/user",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


