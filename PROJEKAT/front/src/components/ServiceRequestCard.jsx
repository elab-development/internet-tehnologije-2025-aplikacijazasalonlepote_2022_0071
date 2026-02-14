import React from "react";
import Button from "./Button";
import ServiceDataList from "./ServiceDataList";

const ServiceRequestCard = ({ req }) => {
  return (
    <div
      className={`bg-white rounded-[2rem] shadow-xl border border-pink-50 overflow-hidden transition-opacity`}
    >
      <div className="bg-gray-50 px-8 py-4 border-b border-pink-50 flex justify-between items-center">
        <div>
          <span className="text-xs font-black text-pink-800 uppercase tracking-widest">
            Molba #{req.id}
          </span>
          <h2 className="text-lg font-bold text-gray-800">
            Poslao/la: {req.zaposleni}
          </h2>
        </div>
        <span className="text-sm text-gray-400 font-medium">
          {req.datum_slanja}
        </span>
      </div>

      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        <div className="hidden md:block absolute left-1/2 top-10 bottom-10 w-px bg-pink-100"></div>
        <ServiceDataList title="Trenutni podaci" data={req.originalni_podaci} />

        <ServiceDataList
          title="Predložene izmene"
          data={req.predlozeni_podaci}
          compareData={req.originalni_podaci}
          isProposed={true}
        />
      </div>


    </div>
  );
};

export default ServiceRequestCard;
