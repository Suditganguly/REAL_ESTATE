import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// PROPERTY ENDPOINTS

// Add a new property (protected)
export const addProperty = async (propertyData, token) => {
  try {
    const response = await api.post(
      "/real-estate/properties",
      propertyData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    toast.error("Failed to add property");
    throw error;
  }
};

// Get all properties (public)
export const getAllProperties = async () => {
  try {
    const response = await api.get("/real-estate/properties");
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch properties");
    throw error;
  }
};

// Get property by ID (public)
export const getPropertyById = async (id) => {
  try {
    const response = await api.get(`/real-estate/properties/${id}`);
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch property");
    throw error;
  }
};

// Delete property (protected)
export const deleteProperty = async (id, token) => {
  try {
    const response = await api.delete(
      `/real-estate/properties/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    toast.error("Failed to delete property");
    throw error;
  }
};

// BOOKING ENDPOINTS

export const bookVisit = async (date, propertyId, email, token) => {
  try {
    await api.post(
      `${import.meta.env.VITE_BOOKING_ROUTE}/book`,
      {
        propertyId,
        visitDate: date,
        email, // optional
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};

export const removeBooking = async (id, email, token) => {
  try {
    await api.post(
      `/user/removeBooking/${id}`,
      { email },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};

// FAVORITES ENDPOINTS

export const toFav = async (id, email, token) => {
  try {
    await api.post(
      `/user/toFav/${id}`,
      { email },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (e) {
    throw e;
  }
};

export const getAllFav = async (email, token) => {
  if (!token) return;
  try {
    const res = await api.post(
      `/user/allFav`,
      { email },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data["favResidenciesID"];
  } catch (e) {
    toast.error("Something went wrong while fetching favs");
    throw e;
  }
};

// BOOKINGS ENDPOINTS

export const getAllBookings = async (email, token) => {
  if (!token) return;
  try {
    const res = await api.post(
      `/user/allBookings`,
      { email },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data["bookedVisits"];
  } catch (error) {
    toast.error("Something went wrong while fetching bookings");
    throw error;
  }
};

// (Legacy) Create a new residency (if needed for old code)
export const createResidency = async (data, token) => {
  try {
    await api.post(
      `/residency/create`,
      { data },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    throw error;
  }
};