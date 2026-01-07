import React from "react";
import {
  Paper,
  Typography,
  Box,
  IconButton,
  LinearProgress,
  Stack,
  MenuItem,
  Select,
  FormControl,
  type SelectChangeEvent,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  MoreVert,
  CalendarToday,
  AccessTime,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";

const bookingData = [
  { month: "Jan", bookings: 65, revenue: 4500 },
  { month: "Feb", bookings: 78, revenue: 5200 },
  { month: "Mar", bookings: 92, revenue: 6100 },
  { month: "Apr", bookings: 85, revenue: 5800 },
  { month: "May", bookings: 105, revenue: 7200 },
  { month: "Jun", bookings: 98, revenue: 6800 },
];

const statusData = [
  { name: "Confirmed", value: 65, color: "#4CAF50" },
  { name: "Pending", value: 20, color: "#FF9800" },
  { name: "Cancelled", value: 10, color: "#F44336" },
  { name: "Completed", value: 45, color: "#2196F3" },
];

const BookingAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = React.useState("monthly");

  const handleTimeRangeChange = (event: SelectChangeEvent) => {
    setTimeRange(event.target.value);
  };

  const stats = [
    { label: "Today", value: "12", icon: <CalendarToday />, color: "#4CAF50" },
    { label: "This Week", value: "84", icon: <AccessTime />, color: "#2196F3" },
    {
      label: "Confirmed",
      value: "65",
      icon: <CheckCircle />,
      color: "#4CAF50",
    },
    { label: "Cancelled", value: "8", icon: <Cancel />, color: "#F44336" },
  ];

  return (
    <Paper sx={{ p: 3, height: "100%" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h6" fontWeight="bold">
          Booking Analytics
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={timeRange}
              onChange={handleTimeRangeChange}
              displayEmpty
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
          </FormControl>
          <IconButton size="small">
            <MoreVert />
          </IconButton>
        </Box>
      </Box>

      {/* Stats Cards */}
      {/* Stats Cards */}
      <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
        {stats.map((stat, index) => (
          <Box key={index} flex="1 1 200px">
            <Paper sx={{ p: 2, bgcolor: `${stat.color}10` }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box sx={{ color: stat.color }}>{stat.icon}</Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {stat.value}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Box>
        ))}
      </Box>

      {/* Charts */}
      {/* Charts */}
      <Box display="flex" flexWrap="wrap" gap={3}>
        {/* Bar Chart */}
        <Box flex="1 1 400px">
          <Box height={250}>
            <Typography variant="subtitle2" gutterBottom>
              Bookings Trend
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="bookings"
                  name="Bookings"
                  fill="#8884d8"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="revenue"
                  name="Revenue ($)"
                  fill="#82ca9d"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        {/* Pie Chart */}
        <Box flex="1 1 300px">
          <Box height={250}>
            <Typography variant="subtitle2" gutterBottom>
              Booking Status
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name }) => name}
                  outerRadius={80}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Box>

      {/* Performance */}
      <Box mt={3}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="subtitle2">Conversion Rate</Typography>
          <Typography variant="subtitle2" fontWeight="bold">
            72%
          </Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={72}
          sx={{
            height: 6,
            borderRadius: 3,
            bgcolor: "#E0E0E0",
            "& .MuiLinearProgress-bar": {
              bgcolor: "#4CAF50",
              borderRadius: 3,
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default BookingAnalytics;
