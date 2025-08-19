import { Box, Typography, Stack, Avatar, Grid } from "@mui/material";
import { useSelector } from "react-redux";

function ForecastWeather() {
  const { weatherData } = useSelector((state) => state.data);
  
  const forecast_Days = weatherData.forecast.forecastday.map((day) => ({
    date: new Date(day.date).toLocaleDateString("en-US", {
      weekday: "short",
    }),
    maxTemp: day.day.maxtemp_c,
    icon: day.day.condition.icon,
  }));

  return (
    <Box color="secondary.main" textAlign="center">
      <Typography
        variant="h4"
        letterSpacing={2}
        p={2}
        fontWeight={900}
        color="tertiary.main"
      >
        Forecast Of The Next {forecast_Days.length} Days
      </Typography>

      <Grid container display={"flex"} justifyContent={"center"}>
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
                letterSpacing={1.5}
                mb={1.5}
                color="tertiary.main"
              >
                {index == 0 ? "Today" : index == 1 ? "Tomorrow" : day.date}
              </Typography>
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
