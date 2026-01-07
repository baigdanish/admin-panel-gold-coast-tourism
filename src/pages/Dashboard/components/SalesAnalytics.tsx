import React from "react";
import {
  Paper,
  Typography,
  Box,
  LinearProgress,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  AvatarGroup,
  Stack,
} from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  MoreVert,
  AttachMoney,
  People,
  ShoppingCart,
  Store,
} from "@mui/icons-material";

interface SalesData {
  id: number;
  product: string;
  revenue: number;
  change: number;
  customers: number;
}

const SalesAnalytics: React.FC = () => {
  const salesData: SalesData[] = [
    {
      id: 1,
      product: "Europe Tour",
      revenue: 12540,
      change: 12.5,
      customers: 45,
    },
    {
      id: 2,
      product: "Asia Package",
      revenue: 8920,
      change: 8.2,
      customers: 32,
    },
    {
      id: 3,
      product: "Beach Resort",
      revenue: 7450,
      change: -3.4,
      customers: 28,
    },
    {
      id: 4,
      product: "Mountain Trek",
      revenue: 6210,
      change: 15.7,
      customers: 39,
    },
  ];

  const stats = [
    {
      label: "Total Revenue",
      value: "$34,120",
      icon: <AttachMoney />,
      change: "+12.5%",
      color: "#4CAF50",
    },
    {
      label: "Total Bookings",
      value: "144",
      icon: <ShoppingCart />,
      change: "+8.2%",
      color: "#2196F3",
    },
    {
      label: "Active Customers",
      value: "89",
      icon: <People />,
      change: "+5.7%",
      color: "#9C27B0",
    },
    {
      label: "Avg. Order Value",
      value: "$237",
      icon: <Store />,
      change: "+3.4%",
      color: "#FF9800",
    },
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
          Sales Analytics
        </Typography>
        <IconButton size="small">
          <MoreVert />
        </IconButton>
      </Box>

      {/* Stats Cards */}
      {/* Stats Cards */}
      <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
        {stats.map((stat, index) => (
          <Box key={index} flex="1 1 220px">
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
                  <Chip
                    label={stat.change}
                    size="small"
                    sx={{
                      mt: 0.5,
                      bgcolor: stat.change.includes("+")
                        ? "#4CAF50"
                        : "#F44336",
                      color: "white",
                      fontSize: "0.7rem",
                    }}
                  />
                </Box>
              </Stack>
            </Paper>
          </Box>
        ))}
      </Box>

      {/* Sales Table */}
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Revenue</TableCell>
              <TableCell align="right">Growth</TableCell>
              <TableCell align="right">Customers</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salesData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Typography fontWeight="medium">{row.product}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography fontWeight="bold">
                    ${row.revenue.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    {row.change > 0 ? (
                      <TrendingUp sx={{ color: "#4CAF50", mr: 0.5 }} />
                    ) : (
                      <TrendingDown sx={{ color: "#F44336", mr: 0.5 }} />
                    )}
                    <Typography color={row.change > 0 ? "#4CAF50" : "#F44336"}>
                      {row.change > 0 ? "+" : ""}
                      {row.change}%
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <AvatarGroup max={3}>
                    {[...Array(Math.min(row.customers, 5))].map((_, i) => (
                      <Avatar
                        key={i}
                        sx={{ width: 24, height: 24 }}
                        src={`https://i.pravatar.cc/150?img=${i + 1}`}
                      />
                    ))}
                  </AvatarGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Progress Bar */}
      <Box mt={3}>
        <Typography variant="body2" color="text.secondary" mb={1}>
          Monthly Target: 85% completed
        </Typography>
        <LinearProgress
          variant="determinate"
          value={85}
          sx={{
            height: 8,
            borderRadius: 4,
            bgcolor: "#E0E0E0",
            "& .MuiLinearProgress-bar": {
              bgcolor: "#4CAF50",
              borderRadius: 4,
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default SalesAnalytics;
