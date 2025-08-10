import { Box, Typography, Stack, Avatar, Grid } from "@mui/material";
import { useAppContext } from "../Contexts/MyContext";

function ForecastWeather() {
  const { weatherData } = useAppContext();

  const forecast_Days = weatherData.forecast.forecastday
    .slice(1)
    .map((day) => ({
      date: new Date(day.date).toLocaleDateString("en-US", {
        weekday: "short",
      }),
      maxTemp: day.day.maxtemp_c,
      minTemp: day.day.mintemp_c,
      icon: day.day.condition.icon,
    }));

  return (
    <Box color="secondary.main" textAlign="center">
      <Typography variant="h5" letterSpacing={2} mb={1} fontWeight={900} color="tertiary.main">
        Forecast of The Next {forecast_Days.length} Days
      </Typography>

      <Grid container>
        {forecast_Days.map((day, index) => (
          <Grid key={index} size={{ sm: 2, xs: 4 }} padding={1}>
            <Stack
              sx={{
                py: 1.5,
                gap: 1,
                backgroundColor: "primary.light",
                alignItems: "center",
                borderRadius: 1,
              }}
            >
              <Typography
                variant="body2"
                fontWeight={550}
                letterSpacing={1}
                color="tertiary.main"
              >
                {index == 0 ? "Tomorrow" : day.date}
              </Typography>
              <Typography variant="body2">{day.minTemp + "°"}</Typography>
              <Avatar alt="weather_icon" src={day.icon} />{" "}
              <Typography variant="body2">{day.maxTemp + "°"}</Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ForecastWeather;
