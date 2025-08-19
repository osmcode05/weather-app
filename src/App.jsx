// MUI
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Container, Grid, CircularProgress } from "@mui/material";
// Components
import HourlyTodayTemp from "./Components/HourlyTodayTemp";
import ForecastWeather from "./Components/ForecastWeather";
import CurrentWeather from "./Components/CurrentWeather";
import SetLocation from "./Components/SetLocation";
import ErrorCmp from "./Components/ErrorCmp";
// Redux
import { useSelector, useDispatch } from "react-redux";
// React
import { useEffect, useState } from "react";
// Functions
import { fetchData } from "./features/weatherSlice";


// Theme
const theme = createTheme({
  palette: {
    primary: { main: "#000000", light: "#171717", contrastText: "#fff" },
    secondary: { main: "#ffffff" },
    tertiary: { main: "#3B82F6" },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontFamily: "'Montserrat', sans-serif", fontWeight: 800 },
    h2: { fontFamily: "'Poppins', sans-serif", fontWeight: 700 },
    h3: { fontFamily: "'Nunito Sans', sans-serif", fontWeight: 600 },
    subtitle1: { fontFamily: "'Lora', serif", fontStyle: "italic" },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container sx={{display: "flex", minHeight: "100vh", p:{ xs: 0, sm: 2, md: 3, lg: 4}}} >
        <AppContent />
      </Container>
    </ThemeProvider>
  );
}

function AppContent() {
  const dispatch = useDispatch();
  const [location, setLocation] = useState({lat: null, lon: null, cityName: "Barcelona"});

  // Get user location
  const getMyLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) =>
      setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude, cityName: null})
    );
  };
  // Initial fetch (try geolocation first)
  useEffect(getMyLocation, []); 

  // Fetch whenever location changes
  useEffect(() => {
    // if (location.lat === null && location.lon === null) return;
    dispatch(fetchData(location))
  }, [dispatch, location]);

  const { weatherData, loading, error } = useSelector((state) => state.data);

  // if there is an error
  if (error) return <ErrorCmp message={error} />; 

   // if loading
  if (loading) return <Box m="auto"><CircularProgress size={50} color="secondary" /></Box>

  return (
    <Box bgcolor="primary.main" color="primary.contrastText" width="100%" display="flex" >
      {weatherData && (
        <Grid container spacing={2} width="100%" alignItems="center" justifyContent="center" >
          
          <Grid item xs={12} md={5}>
            <Box width="100%" mb={3}>
              <SetLocation setLocation={setLocation} getMyLocation={getMyLocation} />
            </Box>
            <Box m="auto"> <CurrentWeather /> </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Box width="100%"> <ForecastWeather /> </Box>
            <Box width="100%"> <HourlyTodayTemp /> </Box>
          </Grid>

        </Grid>
      )}
    </Box>
  );
}
