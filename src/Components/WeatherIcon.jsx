import React from "react";
import { Sun, Cloud, CloudRain, CloudSnow, Zap } from "lucide-react";

const WeatherIcon = ({ condition, size = 24 }) => {
  switch (condition?.toLowerCase()) {
    case "clear":
      return <Sun size={size} />;
    case "clouds":
      return <Cloud size={size} />;
    case "rain":
    case "drizzle":
      return <CloudRain size={size} />;
    case "snow":
      return <CloudSnow size={size} />;
    case "thunderstorm":
      return <Zap size={size} />;
    default:
      return <Sun size={size} />;
  }
};

export default WeatherIcon;
