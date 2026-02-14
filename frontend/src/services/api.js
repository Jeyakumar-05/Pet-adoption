import axios from "axios";
const API_URL = "https://pet-adoption-asv5.onrender.com";
// const API_URL = "http://localhost:7777";

export const fetchPets = async () => {
  try {
    const response = await axios.get(`${API_URL}/pets`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Token missing OR expired
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/login"; // redirect to login
    }
    return [];
  }
};

export const searchPets = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/pets/search?query=${encodeURIComponent(query)}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Token missing OR expired
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/login"; // redirect to login
    }
    return [];
  }
};


export const addPet = async (pet) => {
  try {
    const response = await axios.post(`${API_URL}/pets`, pet, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding pet:", error);
    return null;
  }
};

export const deletePet = async (name) => {
  try {
    await axios.delete(`${API_URL}/pets/${name}`, {
      withCredentials: true,
    });
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

export const fetchContacts = async () => {
  try {
    const response = await axios.get(`${API_URL}/contact`, {
      withCredentials: true,
    });
    return response.data?.data || [];
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
};

export const acceptContactRequest = async (contactId) => {
  try {
    const response = await axios.post(
      `${API_URL}/contact/${contactId}/accept`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error accepting contact request:", error);
    throw error;
  }
};

export const rejectContactRequest = async (contactId) => {
  try {
    const response = await axios.post(
      `${API_URL}/contact/${contactId}/reject`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error rejecting contact request:", error);
    throw error;
  }
};

export const api = axios.create({
  baseURL: `${API_URL}/api/v1/user`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


