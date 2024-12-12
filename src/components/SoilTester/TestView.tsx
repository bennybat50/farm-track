import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DashboardLayout from "../Layout/DashboardLayout";
import baseUrl from "../../hook/Network";

const TestView = () => {
  const { id } = useParams(); 
  const base_url = baseUrl();

  const [farmerData, setFarmerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFarmerData = async () => {
      try {
        const storedUser = localStorage.getItem('authToken');
        const response = await axios.get(`${base_url}/farmer/test-request/${id}`,  {
          headers: {
            "Authorization": `Bearer ${storedUser}`,
          },
        });
        setFarmerData(response.data.data);
      } catch (err) {
        console.error("Error fetching farmer data:", err.response || err);
        setError("Failed to fetch farmer data.");
      } finally {
        setLoading(false);
      }
    };

    fetchFarmerData();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mt-[40px]">
        {/* Land Details */}
        <div className="relative mt-[10px] flex flex-col items-center">
          <h2 className="text-2xl font-semibold mt-3">{farmerData?.land?.name}</h2>
          <p className="text-gray-500">{farmerData?.land.location?.address}</p>
        </div>

        <div className="mt-6 space-y-4 text-gray-700">
          <div className="flex justify-between items-center">
            <p><strong>Land Size:</strong> {farmerData?.land?.totalArea?.value} {farmerData?.land?.totalArea?.unit}</p>
            <p><strong>Status:</strong> 
              <span className="text-white px-2 py-1 rounded-lg bg-green-600">
                {farmerData?.status}
              </span>
            </p>
          </div>
          <div>
            <p><strong>Coordinates:</strong></p>
            <p>Latitude: {farmerData?.land?.location?.coordinates?.latitude}°</p>
            <p>Longitude: {farmerData?.land?.location?.coordinates?.longitude}°</p>
          </div>
          <div>
            <p><strong>Additional note:</strong></p>
            <p>{farmerData?.additionalNotes}</p>
          </div>
        </div>

        {/* Nutrient & Crop Analysis Section */}
        <div className="mt-8 flex space-x-8">
          {/* Nutrients Section */}
          <div className="flex-1 space-y-4">
            <h3 className="text-lg font-semibold">Nutrient Levels</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <label>Nitrogen <br /><b>4.6 mg/kg</b></label>
              <label>Potassium <br /><b>6.4</b></label>
              <label>Iron <br /><b>3.4</b></label>
              <label>Manganese <br /><b>0.5</b></label>
              <label>Boron <br /><b>0.05</b></label>
              <label>Copper <br /><b>2.8</b></label>
              <label>Zinc <br /><b>4.5</b></label>
              <label>CEC <br /><b>2.2</b></label>
              <label>Organic Matter <br /><b>9.2</b></label>
              <label>C/N <br /><b>45.5</b></label>
              <label>Texture <br /><b>89.4</b></label>
              <label>Source <br /><b>34.6</b></label>
            </div>
          </div>

          {/* Crop Analysis Section */}
          <div className="flex-1 space-y-4">
            <h3 className="text-lg font-semibold">Crop Suitability Analysis</h3>
            <div className="space-y-2">
              {['Corn', 'Yam', 'Legum', 'Beans', 'Cassava'].map((crop, index) => (
                <div key={index} className="flex justify-between">
                  <p><strong>{crop}</strong></p>
                  <p><b>50% - Suitable</b></p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Last updated: {new Date().toLocaleString()}
        </p>
      </div>
    </DashboardLayout>
  );
};

export default TestView;
