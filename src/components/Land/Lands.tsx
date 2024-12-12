import React, { useState } from 'react';
import { 
  MapPin, 
  Map as MapIcon, 
  Sun, 
  Image as ImageIcon, 
  Home, 
  Leaf, 
  MoreVertical 
} from 'lucide-react';

interface LandData {
  _id: string;
  name: string;
  image?: string;
  location: {
    state: string;
    address?: string;
    coordinates?: {
      latitude?: number;
      longitude?: number;
    };
  };
  totalArea: {
    value: number;
    unit: 'acres' | 'hectares' | 'square meters';
  };
  landType: 'agricultural' | 'pasture' | 'orchard' | 'other';
  currentCrop?: string;
}

interface FarmerLandsProps {
  lands: LandData[];
}

const getLandTypeIcon = (landType: string) => {
  switch (landType) {
    case 'agricultural': return <Home className="w-6 h-6 text-yellow-500" />;
    case 'pasture': return <Leaf className="w-6 h-6 text-green-600" />;
    case 'orchard': return <Sun className="w-6 h-6 text-orange-500" />;
    default: return <MapIcon className="w-6 h-6 text-gray-600" />;
  }
};

const FarmerLandsDisplay: React.FC<FarmerLandsProps> = ({ lands }) => {
  const [selectedLand, setSelectedLand] = useState<string | null>(null);

  const handleLandDetails = (landId: string) => {
    setSelectedLand(selectedLand === landId ? null : landId);
  };

  if (lands.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-gray-50 rounded-lg border border-gray-300">
        <ImageIcon className="w-24 h-24 text-gray-400 mb-4" />
        <p className="text-xl text-gray-600">No Lands Added Yet</p>
        <p className="text-sm text-gray-500 mt-2">Start by adding your first land</p>
      </div>
    );
  }

  const reversedLands = [...lands].reverse();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {reversedLands.map((land) => (
        <div 
          key={land._id} 
          className="flex border border-gray-300 rounded-lg overflow-hidden hover:border-gray-400 transition-all duration-300"
        >
          {/* Land Image */}
          <div className="w-1/3 h-full">
            {land.image ? (
              <img 
                src={land.image} 
                alt={land.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-gray-500" />
              </div>
            )}
          </div>

          {/* Land Details */}
          <div className="w-2/3 p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{land.name}</h3>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <MapPin className="w-4 h-4 mr-2 text-green-600" />
                  {land.location.state}
                </div>
              </div>
              <button 
                onClick={() => handleLandDetails(land._id)}
                className="bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition"
              >
                <MoreVertical className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            <div className="flex items-center mt-2">
              {getLandTypeIcon(land.landType)}
              <span className="ml-2 text-sm text-gray-800 capitalize">
                {land.landType}
              </span>
            </div>

            {/* Land Metrics */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-gray-100 rounded-lg p-3 text-center">
                <MapIcon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600">Total Area</p>
                <p className="font-semibold text-sm">
                  {land.totalArea.value} {land.totalArea.unit}
                </p>
              </div>

              <div className="bg-gray-100 rounded-lg p-3 text-center">
                <Leaf className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600">Current Crop</p>
                <p className="font-semibold text-sm">
                  {land.currentCrop || 'Not specified'}
                </p>
              </div>
            </div>

            {/* Expanded Details */}
            {selectedLand === land._id && (
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-gray-600" />
                  <p className="text-sm text-gray-700">
                    {land.location.address || 'No address provided'}
                  </p>
                  
                  
                </div>
                <p className="text-sm text-gray-700">
                    Plot-ID: <b>{land._id}</b>
                  </p>
                {land.location.coordinates?.latitude && land.location.coordinates?.longitude && (
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-3 text-gray-600" />
                    <p className="text-sm text-gray-700">
                      Coordinates: {land.location.coordinates.latitude}, {land.location.coordinates.longitude}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FarmerLandsDisplay;