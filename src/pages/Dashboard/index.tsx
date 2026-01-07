import React from "react";
import { Box, Typography, Container } from "@mui/material";

import SalesAnalytics from "./components/SalesAnalytics";
import BookingAnalytics from "./components/BookingAnalytics";
import TourManagement from "./components/TourManagement";

const Dashboard: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Travel Management Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage sales, bookings, tours, and customers in one place
        </Typography>
      </Box>

      {/* Analytics Section */}
      <Box display="flex" flexWrap="wrap" gap={3} mb={4}>
        <Box flex={{ xs: "1 1 100%", md: "1 1 calc(50% - 12px)" }}>
          <SalesAnalytics />
        </Box>

        <Box flex={{ xs: "1 1 100%", md: "1 1 calc(50% - 12px)" }}>
          <BookingAnalytics />
        </Box>
      </Box>

      {/* Tour Management */}
      <Box display="flex">
        <Box flex="1 1 100%">
          <TourManagement />
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
