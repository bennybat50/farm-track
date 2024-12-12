import React, { useState } from 'react';
import {
  Microscope,
  FileText,
  Calendar,
  CheckCircle2,
  Clock,
  Filter
} from 'lucide-react';

// Comprehensive interface for soil test request
interface SoilTestRequest {
  _id: string;
  source: string;
  land: string;
  farmer: string;
  agent?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  desiredTestComponents: string[];
  additionalNotes?: string;
  requestDate: string;
  createdAt: string;
  updatedAt: string;
}

interface SoilTestRequestsProps {
  requests: SoilTestRequest[];
  onRequestDetails?: (request: SoilTestRequest) => void;
}

// Status color mapping
const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'in-progress': return 'bg-blue-100 text-blue-800';
    case 'cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const RequestsList: React.FC<SoilTestRequestsProps> = ({
  requests,
  onRequestDetails
}) => {
  const [selectedRequest, setSelectedRequest] = useState<SoilTestRequest | null>(null);

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-gray-50 rounded-lg">
        <Microscope className="w-24 h-24 text-gray-400 mb-4" />
        <p className="text-xl text-gray-600">No Soil Test Requests</p>
        <p className="text-sm text-gray-500 mt-2">No requests have been made yet</p>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Tabs Section */}
      <div className="w-1/3 bg-gray-50 border-r p-4 space-y-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Recent Requests</h2>
          <Filter className="w-5 h-5 text-gray-600" />
        </div>

        {requests.map((request) => (
          <div
            key={request._id}
            className={`p-4 rounded-lg cursor-pointer shadow-sm transition-all duration-300 ${
              selectedRequest?._id === request._id
                ? 'bg-green-100 border-green-500'
                : 'bg-white hover:shadow-md'
            }`}
            onClick={() => setSelectedRequest(request)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-gray-800 flex items-center">
                  <Microscope className="w-5 h-5 mr-2 text-green-600" />
                  {request.source}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Request ID: {request._id.slice(-6)}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs uppercase ${getStatusColor(request.status)}`}
              >
                {request.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Details Section */}
      <div className="w-2/3 p-6 overflow-y-auto">
        {selectedRequest ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                 Details
              </h2>
              {onRequestDetails && (
                <button
                  onClick={() => onRequestDetails(selectedRequest)}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm hover:bg-green-200 transition"
                >
                  Manage Request
                </button>
              )}
            </div>

            {/* Header */}
            <div className="flex items-center mb-4">
              <Microscope className="w-8 h-8 mr-3 text-green-600" />
              <div>
                <h3 className="text-lg font-bold text-gray-800">{selectedRequest.source}</h3>
                <p className="text-sm text-gray-500">
                  Request ID: {selectedRequest._id}
                </p>
              </div>
            </div>

            {/* Test Components */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Test Components:
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedRequest.desiredTestComponents.map((component) => (
                  <span
                    key={component}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                  >
                    {component}
                  </span>
                ))}
              </div>
            </div>

            {/* Request Dates */}
            <div className="space-y-2 border-t pt-3 mt-3">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2 text-green-600" />
                Request Date: {new Date(selectedRequest.requestDate).toLocaleDateString()}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-2 text-blue-600" />
                Last Updated: {new Date(selectedRequest.updatedAt).toLocaleDateString()}
              </div>
            </div>

            {/* Additional Notes */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-700">
                <FileText className="w-4 h-4 inline-block mr-2 text-gray-600" />
                {selectedRequest.additionalNotes || 'No additional notes'}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Select a request to view its details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestsList;