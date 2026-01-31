import { useState, useEffect } from "react";
import api from "../api";

export const useBookings = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);


  const fetchAvailableSlots = async (serviceId, selectedDate) => {
    if (!serviceId || !selectedDate) return;

    setLoadingSlots(true);
    setError(null);
    try {
      const response = await api.get(
        `/rezervacije/slobodni-termini?usluga_id=${serviceId}&datum=${selectedDate}`
      );
      setTimeSlots(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Greška pri učitavanju termina");
      setTimeSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };


  const bookTermin = async (bookingData) => {
    try {
      await api.post("/klijent/rezervacije", {
        usluga_id: bookingData.service_id,
        datum: bookingData.datum,
        vreme: bookingData.vreme,
      });
      setSelectedService(null);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || "Greška pri rezervaciji",
      };
    }
  };

  

 

  return {
    timeSlots,
    loading,
    loadingSlots,
    error,
    selectedService,
    setSelectedService,
    fetchAvailableSlots,
    bookTermin,
  };
};
