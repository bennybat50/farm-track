import React from 'react';
import { Cloud, Sun, CloudRain, CloudSnow } from 'lucide-react';

interface WeatherForecast {
  date: string;
  temperature: number;
  condition: string;
}

const WeatherCardAlt = () => {
  const forecasts: WeatherForecast[] = [
    { date: '25 June', temperature: 29, condition: 'Sunny' },
    { date: '26 June', temperature: 32, condition: 'Partly cloudy' },
    { date: '27 June', temperature: 39, condition: 'Sunny' },
    { date: '28 June', temperature: 42, condition: 'Sunny' },
  ];

  const getConditionIcon = (condition: string) => {
    switch (condition) {
      case 'Sunny':
        return <Sun className="h-6 w-6 text-yellow-500" />;
      case 'Partly cloudy':
        return <Cloud className="h-6 w-6 text-blue-400" />;
      case 'Rainy':
        return <CloudRain className="h-6 w-6 text-blue-500" />;
      case 'Snowy':
        return <CloudSnow className="h-6 w-6 text-gray-400" />;
      default:
        return <Cloud className="h-6 w-6 text-gray-300" />;
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Daily Weather</h3>
      <ul className="space-y-4">
        {forecasts.map((forecast) => (
          <li
            key={forecast.date}
            className="flex items-center justify-between p-4 bg-white rounded-md shadow-sm hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              {getConditionIcon(forecast.condition)}
              <div>
                <div className="text-lg font-semibold text-gray-700">
                  {forecast.temperature}°
                </div>
                <div className="text-sm text-gray-500">{forecast.condition}</div>
              </div>
            </div>
            <div className="text-sm text-gray-600">{forecast.date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherCardAlt;