import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import getWeatherData from './services/weatherService';
import getFormattedWeatherData from './services/weatherService';
import { useState, useEffect } from 'react';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';



function App() {

  const [query, setQuery] = useState({ q: 'berlin' });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fecthWeather = async () => {
     await getFormattedWeatherData({...query, units}).then((data) => {
        setWeather(data);
     });
    };

    fecthWeather();
  }, [query,units]);




  return (
    <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-purple-700 cyan h-fit shadow-xl shadow-gray-400">
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
      {weather && (
      <div>
      <TimeAndLocation weather={weather} />
      <TemperatureAndDetails weather={weather} />
      <Forecast title="hourly forecast" items={weather.hourly}/>
      <Forecast title="daily forecast" items={weather.daily}/>
      </div>
      
      )}
    </div>

  );
}

export default App;
