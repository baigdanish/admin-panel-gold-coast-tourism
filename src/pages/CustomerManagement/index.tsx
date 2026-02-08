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
import { useFetchUsers } from "../../queries/tours/useFetchUsers";

interface ApiUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

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
  const { data: users } = useFetchUsers();
  console.log("Users Data:", users);

  // ----- MAP API DATA TO TABLE FORMAT -----
  const apiCustomers: Customer[] =
    users?.data?.map((u: ApiUser) => ({
      id: u.id,
      name: `${u.firstName} ${u.lastName}`,
      email: u.email,

      // Default placeholders (until API provides them)
      phone: "N/A",
      location: "N/A",
      bookings: 0,
      totalSpent: 0,
      status: "active",
      lastActivity: "-",
    })) || [];

  const stats = [
    {
      label: "Total Customers",
      value: users?.data?.length || 0,
      change: "+5.2%",
      color: "#2196F3",
    },
    {
      label: "Active Customers",
      value: users?.data?.length || 0,
      change: "+3.8%",
      color: "#4CAF50",
    },
    {
      label: "VIP Customers",
      value: "0",
      change: "+12.5%",
      color: "#FF9800",
    },
    { label: "Avg. Spend", value: "$0", change: "+8.3%", color: "#9C27B0" },
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

  if (!users) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography>Loading users...</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3, borderRadius: "20px" }}>
      <Box mb={3}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Customer Management
        </Typography>

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
              {apiCustomers.map((customer) => (
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

        {/* Satisfaction Section */}
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
