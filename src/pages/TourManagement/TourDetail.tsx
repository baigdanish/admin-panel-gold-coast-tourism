"use client";

import { useParams, useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  Box,
  Stack,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";

import { useFetchToursById } from "../../queries/tours/useFetchToursById";
import { ArrowBack } from "@mui/icons-material";

export default function TourDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useFetchToursById(Number(id));
  const tour = data?.data;

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!tour) {
    return <Typography>No Data Found</Typography>;
  }

  return (
    <Paper sx={{ p: 3, maxWidth: 1000, mx: "auto" }}>
      {/* ===== HEADER ===== */}
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 1 }}
      >
        <IconButton
          onClick={() => navigate("/tour-management")}
          sx={{ color: "#ffd712" }}
        >
          <ArrowBack sx={{ color: "#ffd712" }} />
        </IconButton>
        <Typography variant="h5" fontWeight="bold">
          {tour.title}
        </Typography>
      </Box>

      {/* ===== TITLE ===== */}

      {/* ===== COVER IMAGE ===== */}
      <Box mb={2}>
        <img
          src={tour.coverImageUrl}
          style={{
            width: "100%",
            maxHeight: 350,
            objectFit: "cover",
            borderRadius: 10,
          }}
        />
      </Box>

      {/* ===== BASIC INFO ===== */}
      <Stack direction="row" gap={1} mb={2} flexWrap="wrap">
        <Chip
          icon={<LocationOnIcon />}
          label={`${tour.city}, ${tour.country}`}
        />

        <Chip
          icon={<PeopleIcon />}
          label={`${tour.minGuests} - ${tour.maxGuests} Guests`}
        />

        <Chip
          label={tour.isPublished ? "Published" : "Draft"}
          color={tour.isPublished ? "success" : "warning"}
        />
      </Stack>

      <Typography mb={2}>{tour.description}</Typography>

      <Divider sx={{ my: 2 }} />

      {/* ===== PRICING ===== */}
      <Typography variant="h6">Pricing</Typography>

      <Typography fontWeight="bold" mb={2}>
        {tour.currency} {tour.priceFrom}
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* ===== GALLERY ===== */}
      <Typography variant="h6" mb={1}>
        Gallery
      </Typography>

      <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
        {tour.images?.length === 0 && (
          <Typography>No gallery images</Typography>
        )}

        {tour.images?.map((img: any, i: number) => (
          <img
            key={i}
            src={img.url}
            style={{
              width: 160,
              height: 120,
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* ===== SEO ===== */}
      <Typography variant="h6">SEO</Typography>

      <Typography>
        <b>Meta Title:</b> {tour.metaTitle || "N/A"}
      </Typography>

      <Typography>
        <b>Meta Description:</b> {tour.metaDescription || "N/A"}
      </Typography>
    </Paper>
  );
}
