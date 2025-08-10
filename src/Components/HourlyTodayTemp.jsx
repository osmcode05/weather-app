import { LineChart } from "@mui/x-charts/LineChart";
import { useAppContext } from "../Contexts/MyContext";

const timeLabels = [ "12 AM", "2 AM", "4 AM", "6 AM", "8 AM", "10 AM", "12 PM", "2 PM", "4 PM", "6 PM", "8 PM", "10 PM"];

export default function HourlyTodayTemp() {
  const { weatherData } = useAppContext();
  const TodayTempurature = weatherData.forecast.forecastday[0].hour;
  const temperatureData = TodayTempurature.filter((d, i) => i % 2 === 0 ? d : null ).map((item) => item.temp_c);

  return (
    <LineChart
      series={[
        {
          data: temperatureData,
          label: "Temperature (°C)",
          type: "line",
          showMark: true,
          color: "#f15c00ff",
        },
      ]}
      xAxis={[
        {
          scaleType: "point",
          data: timeLabels,
          label: "Time of Day",
          tickLabelStyle: { fill: "#fff" },
          labelStyle: { fill: "#fff" },
        },
      ]}
      yAxis={[
        {
          label: "Temperature (°C)",
          tickLabelStyle: { fill: "#fff" },
          labelStyle: { fill: "#fff" },
        },
      ]}
      height={220}
      sx={{
        backgroundColor: "transparent",
        ".MuiChartsAxis-bottom .MuiChartsAxis-line": {
          stroke: "#ccc",
        },
        ".MuiChartsAxis-left .MuiChartsAxis-line": {
          stroke: "#ccc",
        },
        ".MuiChartsAxis-tickLabel": { fill: "#fff" },
        ".MuiChartsAxis-label": { fill: "#fff" },
        ".MuiChartsLegend-root": { color: "#fff" },
        ".MuiChartsGrid-line": { stroke: "#fff" },
      }}
      disableAxisListener
    />
  );
}
