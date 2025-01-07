import axios from "axios";
const API_URL = "http://localhost:7777";

// export const fetchPets = async () => {
//   try {
//     const response = await fetch(`${API_URL}/pets`);
//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching pets:', error);
//     return [];
//   }
// };

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

// Signup request
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    console.error("Signup Error:", error);
    throw error;
  }
};

// Login request
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;  // contains JWT token and user details
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};


// Save token to localStorage for future requests
export const saveToken = (token) => {
  localStorage.setItem("authToken", token);
};

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem("authToken");
};

// Clear token from localStorage
export const logout = () => {
  localStorage.removeItem("authToken");
};
