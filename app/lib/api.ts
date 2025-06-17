import axios from "axios";

const baseUrl = "http://192.168.1.11:3000";

export interface Property {
  id: string;
  title: string;
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  features: string[];
  images: string[];
}

export interface Booking {
  id: string;
  propertyId: string;
  userId: string;
  checkIn: string; // You can also use `Date` if you parse it
  checkOut: string; // Same here
  status: "pending" | "confirmed" | "cancelled"; // Add other statuses as needed
}

export const fetchProperties = async () => {
  const res = await axios.get(`${baseUrl}/properties`);
  return res.data;
};

export const fetchBooking = async () => {
  const res = await axios.get(`${baseUrl}/bookings`);
  return res.data;
};

export const fetchProfile = async () => {
    const res = await axios.get(`${baseUrl}/profile`);
    return res.data;
  };

export const bookProperty = async (booking: Omit<Booking, "id">): Promise<Booking> => {
  const res = await axios.post(`${baseUrl}/bookings`, booking);
  return res.data;
};
