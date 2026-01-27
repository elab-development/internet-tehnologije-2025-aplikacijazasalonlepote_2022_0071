import React from "react";
import { useServices } from "../hooks/useServices";
import Alert from "../components/Alert";
import ServiceHeader from "../components/ServiceHeader";
import ServiceCard from "../components/ServiceCard";
import Pagination from "../components/Pagination";
import { useAuth } from "../hooks/useAuth";


const ServicesList = () => {
  const { getUserData } = useAuth();

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



  const getButtonProps = () => {
    if (user.type === "vlasnica") return "IZMENI";
    else if (user.type === "klijent") return "ZAKAZI";
  };

  const handleAction = (service) => {
    console.log("Service action triggered for:", service);
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
