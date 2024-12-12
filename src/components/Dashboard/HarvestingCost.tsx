import React from 'react';

const HarvestingCost = () => {
  const crops = [
    { name: 'Corn', cost: 200, percentage: 50 },
    { name: 'Beans', cost: 300, percentage: 70 },
    { name: 'Yam', cost: 400, percentage: 85 },
    { name: 'Cassava', cost: 250, percentage: 60 },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-md max-w-md mx-auto">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Harvesting Costs</h3>
      <div className="space-y-4">
        {crops.map((crop, index) => (
          <div key={index} className="flex items-center justify-between bg-[#F9FAFB] rounded-lg p-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-700">{crop.name}</h4>
              <p className="text-sm text-gray-500">Cost: ₦{crop.cost}</p>
            </div>
            <div className="w-1/2">
              <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="absolute h-full bg-green-500"
                  style={{ width: `${crop.percentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1 text-right">
                {crop.percentage}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HarvestingCost;
