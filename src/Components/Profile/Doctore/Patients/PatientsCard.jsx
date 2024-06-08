import React from "react";

function PatientsCard() {
  return (
    <div>
      <div className="w-80 h-56 relative bg-gradient-to-l from-white to-purple-50 rounded-2xl">
        <div className="flex flex-col items-start py-6 pr-20 pl-6 font-semibold text-purple-700 whitespace-nowrap rounded-2xl max-w-[346px]">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/f62c767156ece032bb20952c52a2cd4b9a23d54278e73f699c1c924a5af0f512?apiKey=ce15f09aba8c461ea95db36c370d18d3&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/f62c767156ece032bb20952c52a2cd4b9a23d54278e73f699c1c924a5af0f512?apiKey=ce15f09aba8c461ea95db36c370d18d3&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f62c767156ece032bb20952c52a2cd4b9a23d54278e73f699c1c924a5af0f512?apiKey=ce15f09aba8c461ea95db36c370d18d3&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/f62c767156ece032bb20952c52a2cd4b9a23d54278e73f699c1c924a5af0f512?apiKey=ce15f09aba8c461ea95db36c370d18d3&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/f62c767156ece032bb20952c52a2cd4b9a23d54278e73f699c1c924a5af0f512?apiKey=ce15f09aba8c461ea95db36c370d18d3&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f62c767156ece032bb20952c52a2cd4b9a23d54278e73f699c1c924a5af0f512?apiKey=ce15f09aba8c461ea95db36c370d18d3&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/f62c767156ece032bb20952c52a2cd4b9a23d54278e73f699c1c924a5af0f512?apiKey=ce15f09aba8c461ea95db36c370d18d3&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/f62c767156ece032bb20952c52a2cd4b9a23d54278e73f699c1c924a5af0f512?apiKey=ce15f09aba8c461ea95db36c370d18d3&"
            className="rounded-full aspect-square w-[70px]"
          />
          <div className="mt-14 text-4xl">M.Adnane</div>
          <div className="mt-3 text-sm">Online</div>
        </div>
      </div>
    </div>
  );
}

export default PatientsCard;
