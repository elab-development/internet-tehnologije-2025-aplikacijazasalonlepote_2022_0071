import { useState, useEffect } from "react";
import api from "../api";

export const useServices = (initialFilters) => {
  const [services, setServices] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [absoluteMaxPrice, setAbsoluteMaxPrice] = useState(0);
  const [filters, setFilters] = useState(initialFilters);

  const fetchServices = async () => {
    setLoading(true);
    try {
      let response;
      
        response = await api.get("/usluge", { params: filters });
      

      const data = response.data.data;
      setServices(data);
      setMeta(response.data.meta);
    } catch (err) {
      console.error("Greška pri učitavanju usluga");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchServices, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  useEffect(() => {
    if (services.length > 0) {
      const highestInCurrentFetch = Math.max(
        ...services.map((s) => s.cena_raw || 0),
      );

      setAbsoluteMaxPrice((prevMax) => {
        if (highestInCurrentFetch > prevMax || prevMax === 0) {
          return highestInCurrentFetch;
        }
        return prevMax;
      });
    }
  }, [services]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value, page: 1 });
  };

  const handlePageChange = (page) => {
    setFilters({ ...filters, page });
  };


  return {
    services,
    meta,
    loading,
    absoluteMaxPrice,
    filters,
    fetchServices,
    setFilters,
    handleFilterChange,
    handlePageChange,
  };
};
