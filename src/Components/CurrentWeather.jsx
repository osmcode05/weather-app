import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { Box, Typography, Stack, Avatar, Paper, Divider } from "@mui/material";
import {
  ArrowUpward,
  ArrowDownward,
  LocationOn,
  AccessTime,
  Opacity,
  Air,
} from "@mui/icons-material";
import { useAppContext } from "../Contexts/MyContext";

export default function CurrentWeather() {
  const { weatherData } = useAppContext();

  const { temp_c, condition, wind_kph, humidity } = weatherData.current;
  const { name, country, tz_id } = weatherData.location;
  const { maxtemp_c, mintemp_c } = weatherData.forecast.forecastday[0].day;

  const [time, setTime] = useState(
    DateTime.now().setZone(tz_id).toFormat("HH:mm")
  );

  useEffect(() => {
    const timer = setInterval( () => setTime(DateTime.now().setZone(tz_id).toFormat("HH:mm")), 60000 ); 
    return () => clearInterval(timer);
  }, [tz_id]);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        border: "1px solid #424141ff",
        bgcolor: "primary.light",
        borderRadius: 4,
        color: "primary.contrastText",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={5}
      >
        <Stack>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ display: "flex", alignItems: "flex-start" }}
          >
            {temp_c}
            <Typography variant="h5" component="span">
              {" "}
              °C{" "}
            </Typography>
          </Typography>

          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center", mt: 1 }}
          >
            <LocationOn fontSize="small" />
            {name}, {country}
          </Typography>
        </Stack>

        <Stack alignItems="center">
          <Typography variant="body1">{condition.text}</Typography>
          <Avatar
            src={condition.icon}
            alt="icon"
            sx={{ width: 80, height: 80 }}
          />
        </Stack>
      </Stack>

      <Divider sx={{ my: 2, bgcolor: "#ffffff4d" }} />

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <AccessTime fontSize="small" />
        <Typography variant="body2" letterSpacing={1}>{time}</Typography>
      </Box>

      <Stack
        sx={{
          gap: { xs: 1, sm: 7 },
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Stack alignItems="center">
          <ArrowUpward fontSize="small" sx={{ color: "#ff0404ff" }} />
          <Typography variant="body2" fontWeight={600}>
            {maxtemp_c}°
          </Typography>
        </Stack>

        <Stack alignItems="center">
          <ArrowDownward fontSize="small" sx={{ color: "#10ff34ff" }} />
          <Typography variant="body2" fontWeight={600}>
            {mintemp_c}°
          </Typography>
        </Stack>

        <Stack alignItems="center">
          <Opacity fontSize="small" sx={{ color: "#00bcd4" }} />
          <Typography variant="body2" fontWeight={600}>
            {humidity}%
          </Typography>
        </Stack>

        <Stack alignItems="center">
          <Air fontSize="small" sx={{ color: "#9e9e9e" }} />
          <Typography variant="body2" fontWeight={600}>
            {wind_kph} km/h
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
