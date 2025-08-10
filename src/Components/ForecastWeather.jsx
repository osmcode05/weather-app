import { Box, Typography, Stack, Avatar } from "@mui/material";
import { useAppContext } from "../Contexts/MyContext";

function ForecastWeather() {
    const { weatherData } = useAppContext();
  

  const forecast_Days = weatherData.forecast.forecastday
    .slice(1)
    .map((day) => ({
      date: new Date(day.date).toLocaleDateString("en-US", {weekday: "short",}),
      maxTemp: day.day.maxtemp_c,
      minTemp: day.day.mintemp_c,
      icon: day.day.condition.icon,
    }));

  return (
    <Box color="secondary.main" textAlign="center" p={1} >
      
      <Typography variant="h6" mb={1} fontWeight={900} color="tertiary.main">
        Forecast of The next 6 Day
      </Typography>

      <Stack direction="row" justifyContent="space-around">
        {forecast_Days.map((day, index) => (
          <Stack key={index} p={1} bgcolor="primary.light" direction="column" alignItems="center" justifyContent="center" gap={1}>
            <Box />
            <Typography variant="body2" color="tertiary.main">
              {index == 0 ? "Tomorrow" : day.date}
            </Typography>
            <Typography variant="body1">{day.minTemp + "°"}</Typography>
            <Avatar alt="weather_icon" src={day.icon} />
            <Typography variant="body1">{day.maxTemp + "°"}</Typography>
          </Stack>
        ))}
      </Stack>
      
    </Box>
  );
}

export default ForecastWeather;
