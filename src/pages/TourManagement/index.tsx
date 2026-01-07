import React, { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Edit,
  Delete,
  Add,
  Search,
  Visibility,
  AttachMoney,
  People,
} from "@mui/icons-material";

interface Tour {
  id: number;
  name: string;
  destination: string;
  price: number;
  capacity: number;
  booked: number;
  status: "active" | "inactive" | "upcoming";
  startDate: string;
  endDate: string;
}

const TourManagement: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([
    {
      id: 1,
      name: "European Adventure",
      destination: "Paris, Rome, Barcelona",
      price: 2499,
      capacity: 50,
      booked: 42,
      status: "active",
      startDate: "2024-04-15",
      endDate: "2024-04-25",
    },
    {
      id: 2,
      name: "Asian Explorer",
      destination: "Tokyo, Bangkok, Bali",
      price: 3199,
      capacity: 30,
      booked: 28,
      status: "active",
      startDate: "2024-05-10",
      endDate: "2024-05-24",
    },
    {
      id: 3,
      name: "Beach Paradise",
      destination: "Maldives, Seychelles",
      price: 4599,
      capacity: 20,
      booked: 15,
      status: "active",
      startDate: "2024-06-01",
      endDate: "2024-06-10",
    },
    {
      id: 4,
      name: "Mountain Trek",
      destination: "Swiss Alps",
      price: 1899,
      capacity: 25,
      booked: 10,
      status: "upcoming",
      startDate: "2024-07-15",
      endDate: "2024-07-22",
    },
    {
      id: 5,
      name: "Cultural Journey",
      destination: "Egypt, Jordan",
      price: 2899,
      capacity: 35,
      booked: 35,
      status: "inactive",
      startDate: "2024-03-01",
      endDate: "2024-03-14",
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleEdit = (tour: Tour) => {
    setEditingTour(tour);
    setOpenDialog(true);
  };

  const handleDelete = (id: number) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

  const handleSave = () => {
    // Save logic here
    setOpenDialog(false);
    setEditingTour(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "error";
      case "upcoming":
        return "warning";
      default:
        return "default";
    }
  };

  const filteredTours = tours.filter(
    (tour) =>
      tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper sx={{ p: 3 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h6" fontWeight="bold">
          Tour Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
        >
          Create New Tour
        </Button>
      </Box>

      {/* Search and Filter */}
      <Stack direction="row" spacing={2} mb={3}>
        <TextField
          placeholder="Search tours..."
          size="small"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select label="Status" defaultValue="all">
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
            <MenuItem value="upcoming">Upcoming</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Tours Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tour Name</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Capacity</TableCell>
              <TableCell align="center">Booked</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTours.map((tour) => (
              <TableRow key={tour.id} hover>
                <TableCell>
                  <Typography fontWeight="medium">{tour.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tour.startDate} - {tour.endDate}
                  </Typography>
                </TableCell>
                <TableCell>{tour.destination}</TableCell>
                <TableCell align="center">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <AttachMoney sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography fontWeight="bold">{tour.price}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <People sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography>{tour.capacity}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Typography fontWeight="bold">{tour.booked}</Typography>
                    <Chip
                      label={`${Math.round(
                        (tour.booked / tour.capacity) * 100
                      )}%`}
                      size="small"
                      color={
                        tour.booked === tour.capacity ? "error" : "primary"
                      }
                    />
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={tour.status}
                    color={getStatusColor(tour.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <IconButton size="small" onClick={() => handleEdit(tour)}>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <Visibility fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(tour.id)}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingTour ? "Edit Tour" : "Create New Tour"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Box display="flex" flexWrap="wrap" gap={2}>
              <Box flex="1 1 48%">
                <TextField
                  label="Tour Name"
                  fullWidth
                  defaultValue={editingTour?.name}
                />
              </Box>

              <Box flex="1 1 48%">
                <TextField
                  label="Destination"
                  fullWidth
                  defaultValue={editingTour?.destination}
                />
              </Box>

              <Box flex="1 1 48%">
                <TextField
                  label="Price"
                  type="number"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  defaultValue={editingTour?.price}
                />
              </Box>

              <Box flex="1 1 48%">
                <TextField
                  label="Capacity"
                  type="number"
                  fullWidth
                  defaultValue={editingTour?.capacity}
                />
              </Box>

              <Box flex="1 1 48%">
                <TextField
                  label="Start Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  defaultValue={editingTour?.startDate}
                />
              </Box>

              <Box flex="1 1 48%">
                <TextField
                  label="End Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  defaultValue={editingTour?.endDate}
                />
              </Box>

              <Box flex="1 1 100%">
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    defaultValue={editingTour?.status || "active"}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                    <MenuItem value="upcoming">Upcoming</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {editingTour ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default TourManagement;
