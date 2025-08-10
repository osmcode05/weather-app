import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Container, Grid, Typography } from "@mui/material";
import HourlyTodayTemp from "./Components/HourlyTodayTemp";
import ForecastWeather from "./Components/ForecastWeather";
import CurrentWeather from "./Components/CurrentWeather";
import SetLocation from "./Components/SetLocation";
import AppContextProvider, { useAppContext } from "./Contexts/MyContext";

const theme = createTheme({
  palette: {
    primary: { main: "#000000", light: "#171717", contrastText: "#fff" },
    secondary: { main: "#ffffff" },
    tertiary: { main: "#3B82F6" },
  },
  typography: {
    fontFamily: "'Inter', sans-serif", // Default for body
    h1: { fontFamily: "'Montserrat', sans-serif", fontWeight: 800 }, // Temp
    h2: { fontFamily: "'Poppins', sans-serif", fontWeight: 700 }, // City name
    h3: { fontFamily: "'Nunito Sans', sans-serif", fontWeight: 600 }, // Weather description
    subtitle1: { fontFamily: "'Lora', serif", fontStyle: "italic" }, // Extra info
  },
});

export default function App() {
  return (
    <AppContextProvider>
      <ThemeProvider theme={theme}>
        <Container
          sx={{
            display: "flex",
            minHeight: "100vh",
            p: { xs: 0, sm: 2, md: 3, lg: 4 },
          }}
        >
          <AppContent />
        </Container>
      </ThemeProvider>
    </AppContextProvider>
  );
}

function AppContent() {
  const { weatherData, loading, error } = useAppContext();

  if (loading) return;

  if (error) {
    return (
      <Typography fontWeight={900} variant="h5" color="error" m="auto">
        {error}
      </Typography>
    );
  }

  return (
    <Box bgcolor="primary.main" color="primary.contrastText" width="100%" display="flex" >
      {!loading && !error && weatherData && (
        <Grid container spacing={2} width="100%" display="flex" alignItems="center" justifyContent="center" >

          <Grid container size={{ xs: 12, md: 5 }} spacing={2}>
            <Box width="100%"><SetLocation /></Box>
            <Box m="auto"><CurrentWeather /></Box>
          </Grid>

          <Grid container size={{ xs: 12, md: 7 }} spacing={2}>
            <Box width="100%"><ForecastWeather /></Box>
            <Box width="100%"><HourlyTodayTemp /></Box>
          </Grid>

        </Grid>
      )}
    </Box>
  );
}
