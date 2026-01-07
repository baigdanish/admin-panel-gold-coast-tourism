import React from "react";
import {
  Paper,
  Typography,
  Box,
  Avatar,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  Stack,
  Button,
} from "@mui/material";
import {
  Search,
  Email,
  Phone,
  Edit,
  Delete,
  Star,
  LocationOn,
  CalendarToday,
} from "@mui/icons-material";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  bookings: number;
  totalSpent: number;
  status: "active" | "inactive" | "vip";
  lastActivity: string;
}

const CustomerManagement: React.FC = () => {
  const customers: Customer[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234 567 8900",
      location: "New York",
      bookings: 12,
      totalSpent: 28750,
      status: "vip",
      lastActivity: "2024-03-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 234 567 8901",
      location: "London",
      bookings: 8,
      totalSpent: 19500,
      status: "active",
      lastActivity: "2024-03-16",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      phone: "+1 234 567 8902",
      location: "Sydney",
      bookings: 5,
      totalSpent: 12500,
      status: "active",
      lastActivity: "2024-03-14",
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      phone: "+1 234 567 8903",
      location: "Tokyo",
      bookings: 3,
      totalSpent: 8500,
      status: "inactive",
      lastActivity: "2024-02-28",
    },
    {
      id: 5,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      phone: "+1 234 567 8904",
      location: "Paris",
      bookings: 15,
      totalSpent: 35200,
      status: "vip",
      lastActivity: "2024-03-16",
    },
  ];

  const stats = [
    {
      label: "Total Customers",
      value: "1,245",
      change: "+5.2%",
      color: "#2196F3",
    },
    {
      label: "Active Customers",
      value: "892",
      change: "+3.8%",
      color: "#4CAF50",
    },
    {
      label: "VIP Customers",
      value: "156",
      change: "+12.5%",
      color: "#FF9800",
    },
    { label: "Avg. Spend", value: "$2,450", change: "+8.3%", color: "#9C27B0" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "error";
      case "vip":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box mb={3}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Customer Management
        </Typography>

        {/* Stats Cards */}
        {/* Stats Cards */}
        <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
          {stats.map((stat, index) => (
            <Box key={index} flex="1 1 220px">
              <Paper sx={{ p: 2, bgcolor: `${stat.color}10` }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {stat.label}
                </Typography>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  {stat.value}
                </Typography>
                <Chip
                  label={stat.change}
                  size="small"
                  sx={{
                    bgcolor: stat.change.includes("+") ? "#4CAF50" : "#F44336",
                    color: "white",
                    fontSize: "0.7rem",
                  }}
                />
              </Paper>
            </Box>
          ))}
        </Box>

        {/* Search */}
        <TextField
          placeholder="Search customers..."
          size="small"
          fullWidth
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        {/* Customers Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell align="right">Bookings</TableCell>
                <TableCell align="right">Total Spent</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id} hover>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Avatar sx={{ mr: 2 }}>{customer.name.charAt(0)}</Avatar>
                      <Box>
                        <Typography fontWeight="medium">
                          {customer.name}
                          {customer.status === "vip" && (
                            <Star
                              sx={{ fontSize: 14, color: "#FF9800", ml: 0.5 }}
                            />
                          )}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <LocationOn
                            sx={{
                              fontSize: 12,
                              verticalAlign: "middle",
                              mr: 0.5,
                            }}
                          />
                          {customer.location}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      <Email
                        sx={{ fontSize: 12, verticalAlign: "middle", mr: 0.5 }}
                      />
                      {customer.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <Phone
                        sx={{ fontSize: 12, verticalAlign: "middle", mr: 0.5 }}
                      />
                      {customer.phone}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography fontWeight="bold">
                      {customer.bookings}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography fontWeight="bold" color="primary">
                      ${customer.totalSpent.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={customer.status}
                      color={getStatusColor(customer.status)}
                      size="small"
                    />
                    <Typography
                      variant="caption"
                      display="block"
                      color="text.secondary"
                    >
                      <CalendarToday
                        sx={{ fontSize: 10, verticalAlign: "middle", mr: 0.5 }}
                      />
                      {customer.lastActivity}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <IconButton size="small">
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton size="small">
                        <Email fontSize="small" />
                      </IconButton>
                      <IconButton size="small">
                        <Delete fontSize="small" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Customer Satisfaction */}
        <Box mt={3} p={2} bgcolor="background.default" borderRadius={1}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Customer Satisfaction
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                4.8/5
              </Typography>
              <Stack direction="row" spacing={0.5}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} sx={{ color: "#FFD700", fontSize: 16 }} />
                ))}
              </Stack>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Based on 245 reviews
              </Typography>
              <Button variant="outlined" size="small">
                View Reviews
              </Button>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
};

export default CustomerManagement;
