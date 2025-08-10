import { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import emailjs from "emailjs-com";

const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
    cityName: "Barcelona",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function getLocation() {
    navigator.geolocation.getCurrentPosition((pos) =>
      setLocation({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
        cityName: null,
      })
    );
  }

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if ((!location.lat || !location.lon) && !location.cityName) return;

    if (location.lat && location.lon) {
      emailjs
        .send(
          "service_5v4l6m8",
          "template_2egtqcg",
          {
            lat: location.lat,
            lon: location.lon,
            cityName: location.cityName || "Unknown",
            time: new Date().toLocaleString(),
          },
          "eTNZx53Mh5A2YTMCi"
        )
        .then(() => console.log("Email sent!"))
        .catch((err) => console.error("Email error:", err));
    }

    setLoading(true);
    setError(null);

    axios
      .get("https://api.weatherapi.com/v1/forecast.json", {
        params: {
          key: import.meta.env.VITE_API_KEY,
          q: location.cityName || `${location.lat},${location.lon}`,
          days: 7,
        },
      })
      .then((res) => setWeatherData(res.data))
      .catch((err) => {
        console.error(err);
        err.status == 400 &&
          setError("400 Bad Request : No matching location found.");
      })
      .finally(() => setLoading(false));
  }, [location]);

  return (
    <AppContext.Provider
      value={{
        weatherData,
        location,
        loading,
        error,
        getLocation,
        setLocation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
