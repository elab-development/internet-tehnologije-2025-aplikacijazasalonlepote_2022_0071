import { useState, useEffect } from "react";
import api from "../api";

export const useEmployees = (initialFilters) => {
  const [employees, setEmployees] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);

  const [searchIme, setSearchIme] = useState("");
  const [searchPrezime, setSearchPrezime] = useState("");


  const [filters, setFilters] = useState(initialFilters);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await api.get("/vlasnica/zaposleni", {
        params: filters,
      });
      setEmployees(response.data.data);
      setMeta(response.data.meta);
    } catch (err) {
      console.error("Greška pri učitavanju zaposlenih", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [filters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        ime: searchIme,
        prezime: searchPrezime,
        page: 1,
      }));
    }, 500);
    return () => clearTimeout(timer);
  }, [searchIme, searchPrezime]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "ime") setSearchIme(value);
    else if (name === "prezime") setSearchPrezime(value);
    else setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
  };

 


  return {
    employees,
    meta,
    loading,
    filters,
    setFilters,
    searchIme,
    searchPrezime,
    handleFilterChange,
    refresh: fetchEmployees,
    

  };
};
