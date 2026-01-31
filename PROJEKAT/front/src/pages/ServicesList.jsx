import React from "react";
import { useServices } from "../hooks/useServices";
import Alert from "../components/Alert";
import ServiceHeader from "../components/ServiceHeader";
import ServiceCard from "../components/ServiceCard";
import Pagination from "../components/Pagination";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useBookings } from "../hooks/useBookings";
import BookingModal from "../components/BookingModal";


const ServicesList = () => {
  const { getUserData } = useAuth();
  const navigate = useNavigate();
  const user = getUserData();

  const {
    services,
    meta,
    loading,
    absoluteMaxPrice,
    filters,
    handleFilterChange,
    handlePageChange,
  } = useServices({
    sort_by: "cena",
    order: "desc",
    page: 1,
    naziv: "",
    kategorija: "",
  });


 const { selectedService, setSelectedService } = useBookings();
  const getButtonProps = () => {
    if (user.type === "vlasnica") return "IZMENI";
    else if (user.type === "klijent") return "ZAKAZI";
  };

  const handleAction = (service) => {
     if (user.type === "vlasnica") 
      navigate(`/services/edit`, { state: { service } });
    else {
      setSelectedService(service);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
     
     
        <ServiceHeader
          filters={filters}
          onFilterChange={handleFilterChange}
          maxPrice={absoluteMaxPrice}
        />
      

      {loading ? (
        <div className="flex justify-center py-20 animate-pulse">
          <div className="h-12 w-12 border-b-2 border-pink-800 rounded-full animate-spin"></div>
        </div>
      ) : services.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onAction={() => handleAction(service)}
                actionLabel={getButtonProps()}
              />
            ))}
          </div>

             {selectedService && (
            <BookingModal
              service={selectedService}
              onClose={() => setSelectedService(null)}
            />
          )}

          <Pagination meta={meta} onPageChange={handlePageChange} />
        </>
      ) : (
        <Alert
          type="info"
          variant="panel"
          message="Nema pronađenih usluga"
          description="Pokušajte da promenite filtere pretrage."
        />
      )}
    </div>
  );
};

export default ServicesList;
