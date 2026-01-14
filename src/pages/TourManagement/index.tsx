import React, { useEffect, useState } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  InputAdornment,
  Tabs,
  Tab,
  CircularProgress,
} from "@mui/material";
import { Add, Edit, Delete, Search, Visibility } from "@mui/icons-material";
import type { IRequestTours } from "../../interfaces/tours.types";
import { useToursApiActions } from "../../apiActions/useToursApiActions";
import useTourForm from "../../forms/tours/useTourForm";
import { useFetchToursCategories } from "../../queries/tours/useFetchToursCategories";
import { useFetchTours } from "../../queries/tours/useFetchTours";

/* =======================
   EMPTY TEMPLATE
======================= */
const emptyTours: IRequestTours = {
  title: "",
  shortDescription: "",
  description: "",
  city: "",
  country: "",
  address: "",
  latitude: 0,
  longitude: 0,
  durationInMinutes: 0,
  minGuests: 1,
  maxGuests: 1,
  priceFrom: 0,
  currency: "USD",
  coverImageUrl: "",
  imageUrls: [],
  categoryIds: [],
  metaTitle: "",
  metaDescription: "",
};

/* =======================
   DUMMY DATA
======================= */
const dummyTours: IRequestTours[] = [
  {
    title: "Dubai Desert Safari",
    shortDescription: "Dune bashing & BBQ dinner",
    description: "Evening desert safari with live entertainment and BBQ.",
    city: "Dubai",
    country: "UAE",
    address: "Dubai Desert",
    latitude: 25.2048,
    longitude: 55.2708,
    durationInMinutes: 360,
    minGuests: 1,
    maxGuests: 50,
    priceFrom: 75,
    currency: "USD",
    coverImageUrl: "",
    imageUrls: ["https://picsum.photos/300"],
    categoryIds: [1],
    metaTitle: "Dubai Desert Safari",
    metaDescription: "Best desert safari in Dubai",
  },
  {
    title: "Dhow Cruise Marina",
    shortDescription: "Luxury dinner cruise",
    description: "Enjoy buffet dinner while cruising Dubai Marina.",
    city: "Dubai",
    country: "UAE",
    address: "Dubai Marina",
    latitude: 25.0808,
    longitude: 55.1403,
    durationInMinutes: 120,
    minGuests: 1,
    maxGuests: 200,
    priceFrom: 55,
    currency: "USD",
    coverImageUrl: "",
    imageUrls: ["https://picsum.photos/301"],
    categoryIds: [2],
    metaTitle: "Dhow Cruise Marina",
    metaDescription: "Dubai Marina Dinner Cruise",
  },
];

const ToursManagement: React.FC = () => {
  const { tryAddTours } = useToursApiActions();

  const [data, setData] = useState<IRequestTours[]>(dummyTours);
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const { data: tours } = useFetchTours();
  const { data: categories } = useFetchToursCategories();
  console.log("Tour Categories:", categories);
  console.log("Tours Data:", tours);
  /* =======================
     SUBMIT
  ======================= */
  async function onSubmit(values: IRequestTours) {
    await tryAddTours(values);

    if (editingIndex !== null) {
      setData((prev) => prev.map((t, i) => (i === editingIndex ? values : t)));
    } else {
      setData((prev) => [...prev, values]);
    }

    onClose();
  }

  const formik = useTourForm(onSubmit, emptyTours);

  const {
    values,
    touched,
    errors,
    isSubmitting,
    isValid,
    dirty,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
    setValues,
  } = formik;

  const onClose = () => {
    resetForm();
    setEditingIndex(null);
    setOpen(false);
    setTab(0);
  };

  /* =======================
     EDIT MODE
  ======================= */
  useEffect(() => {
    if (editingIndex !== null) {
      setValues(data[editingIndex]);
    } else {
      resetForm();
    }
  }, [editingIndex]);

  const filtered = data.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  /* =======================
     UI
  ======================= */
  return (
    <Paper sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontWeight="bold">
          Tours Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setEditingIndex(null);
            setOpen(true);
          }}
        >
          Add Tour
        </Button>
      </Box>

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
        sx={{ mb: 2 }}
      />

      {/* ===== TABLE ===== */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tour</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Guests</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map((row, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Typography fontWeight="bold">{row.title}</Typography>
                  <Typography variant="body2">
                    {row.shortDescription}
                  </Typography>
                </TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>
                  {row.currency} {row.priceFrom}
                </TableCell>
                <TableCell>
                  {row.minGuests}–{row.maxGuests}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setEditingIndex(i);
                      setOpen(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton>
                    <Visibility />
                  </IconButton>
                  <IconButton
                    onClick={() =>
                      setData((prev) => prev.filter((_, idx) => idx !== i))
                    }
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ===== DIALOG ===== */}
      <Dialog open={open} maxWidth="md" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {editingIndex ? "Edit Tour" : "Create Tour"}
          </DialogTitle>

          <DialogContent>
            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
              <Tab label="Basic" />
              <Tab label="Location" />
              <Tab label="Pricing" />
              <Tab label="Media" />
              <Tab label="SEO" />
            </Tabs>

            {/* BASIC */}
            {tab === 0 && (
              <Stack spacing={2}>
                <TextField
                  label="Title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                />

                <TextField
                  label="Short Description"
                  name="shortDescription"
                  value={values.shortDescription}
                  onChange={handleChange}
                  error={
                    touched.shortDescription && Boolean(errors.shortDescription)
                  }
                  helperText={
                    touched.shortDescription && errors.shortDescription
                  }
                />

                <TextField
                  multiline
                  rows={3}
                  label="Description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
              </Stack>
            )}

            {/* LOCATION */}
            {tab === 1 && (
              <Stack spacing={2}>
                <TextField
                  label="City"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                />
                <TextField
                  label="Country"
                  name="country"
                  value={values.country}
                  onChange={handleChange}
                />
                <TextField
                  label="Address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                />
                <TextField
                  type="number"
                  label="Latitude"
                  value={values.latitude}
                  onChange={(e) => setFieldValue("latitude", +e.target.value)}
                />
                <TextField
                  type="number"
                  label="Longitude"
                  value={values.longitude}
                  onChange={(e) => setFieldValue("longitude", +e.target.value)}
                />
              </Stack>
            )}

            {/* PRICING */}
            {tab === 2 && (
              <Stack spacing={2}>
                <TextField
                  type="number"
                  label="Duration"
                  value={values.durationInMinutes}
                  onChange={(e) =>
                    setFieldValue("durationInMinutes", +e.target.value)
                  }
                />
                <TextField
                  type="number"
                  label="Min Guests"
                  value={values.minGuests}
                  onChange={(e) => setFieldValue("minGuests", +e.target.value)}
                />
                <TextField
                  type="number"
                  label="Max Guests"
                  value={values.maxGuests}
                  onChange={(e) => setFieldValue("maxGuests", +e.target.value)}
                />
                <TextField
                  type="number"
                  label="Price From"
                  value={values.priceFrom}
                  onChange={(e) => setFieldValue("priceFrom", +e.target.value)}
                />
                <TextField
                  label="Currency"
                  value={values.currency}
                  onChange={handleChange}
                />
              </Stack>
            )}

            {/* MEDIA */}
            {tab === 3 && (
              <Stack spacing={2}>
                <TextField
                  label="Cover Image URL"
                  value={values.coverImageUrl}
                  onChange={handleChange}
                  name="coverImageUrl"
                />
                <TextField
                  label="Gallery Images"
                  value={values.imageUrls.join(",")}
                  onChange={(e) =>
                    setFieldValue("imageUrls", e.target.value.split(","))
                  }
                />
              </Stack>
            )}

            {/* SEO */}
            {tab === 4 && (
              <Stack spacing={2}>
                <TextField
                  label="Meta Title"
                  value={values.metaTitle}
                  onChange={handleChange}
                  name="metaTitle"
                />
                <TextField
                  multiline
                  rows={2}
                  label="Meta Description"
                  value={values.metaDescription}
                  onChange={handleChange}
                  name="metaDescription"
                />
              </Stack>
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={!isValid || !dirty || isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress size={18} />
              ) : editingIndex ? (
                "Update"
              ) : (
                "Create"
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Paper>
  );
};

export default ToursManagement;
