"use client";

import { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Stack,
} from "@mui/material";

import {
  Add,
  Edit,
  Delete,
  Search,
  Visibility,
  LocationOn,
} from "@mui/icons-material";

import AddTour from "./AddTour";
import { useFetchTours } from "../../queries/tours/useFetchTours";
import { useNavigate } from "react-router-dom";
import { useToursApiActions } from "../../apiActions/useToursApiActions";
import { useAlert } from "../../components/Alert";

export default function ToursManagement() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedTour, setSelectedTour] = useState<any | null>(null);
  const { tryDeleteTour } = useToursApiActions();
  const { data: toursResponse, isLoading } = useFetchTours();
  const navigate = useNavigate();
  const alert = useAlert();

  const tours = toursResponse?.data || [];

  const filtered = tours.filter((t: any) =>
    t.title?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleAddTour = () => {
    setSelectedTour(null);
    setOpen(true);
  };

  const handleEdit = (tour: any) => {
    setSelectedTour(tour);
    setOpen(true);
  };
  const handleDelete = (id: any) => {
    alert?.show({
      title: "Confirmation",
      message: "Do you really want to delete this tour?",
      cancelText: "No",
      confirmText: "Yes",
      onConfirm: () => tryDeleteTour?.(id),
    });
  };

  return (
    <Paper sx={{ p: 3, borderRadius: "20px" }}>
      {/* ===== HEADER ===== */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontWeight="bold">
          Tours Management
        </Typography>

        <Button variant="contained" startIcon={<Add />} onClick={handleAddTour}>
          Add Tour
        </Button>
      </Box>

      {/* ===== SEARCH ===== */}
      <TextField
        fullWidth
        size="small"
        placeholder="Search tours..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      {/* ===== FLEX CARD LIST ===== */}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {filtered.map((tour: any) => (
          <Card
            key={tour.id}
            sx={{
              width: {
                xs: "60%",
                sm: "38%",
                lg: "26%",
              },
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardMedia
              component="img"
              height="180"
              image={tour.coverImageUrl}
            />

            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" fontWeight="bold">
                {tour.title}
              </Typography>
              {/* 
              <Typography variant="body2" color="text.secondary" mb={1}>
                {tour.shortDescription}
              </Typography> */}

              <Stack direction="row" gap={1} mb={1} flexWrap="wrap">
                <Chip
                  icon={<LocationOn />}
                  label={`${tour.city}, ${tour.country}`}
                  size="small"
                />

                {/* <Chip
                  icon={<People />}
                  label={`${tour.minGuests}-${tour.maxGuests}`}
                  size="small"
                /> */}
              </Stack>

              {/* <Typography fontWeight="bold" mb={1}>
                {tour.currency} {tour.priceFrom}
              </Typography> */}

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Chip
                  label={tour.isPublished ? "Published" : "Draft"}
                  color={tour.isPublished ? "success" : "warning"}
                  size="small"
                />

                <Box>
                  <IconButton onClick={() => handleEdit(tour)}>
                    <Edit />
                  </IconButton>

                  <IconButton
                    onClick={() => navigate(`/tour-management/${tour.id}`)}
                  >
                    <Visibility />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => handleDelete(tour.id)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>

      {!isLoading && filtered.length === 0 && (
        <Typography textAlign="center" mt={4}>
          No tours found
        </Typography>
      )}

      {/* ===== ADD / EDIT SLIDER ===== */}
      <AddTour
        open={open}
        onClose={() => setOpen(false)}
        editData={selectedTour}
      />
    </Paper>
  );
}
