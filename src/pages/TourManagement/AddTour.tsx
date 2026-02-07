"use client";

import React, { useState } from "react";
import {
  Paper,
  Typography,
  Tabs,
  Tab,
  Stack,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  IconButton,
  FormHelperText,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useToursApiActions } from "../../apiActions/useToursApiActions";
import useTourForm from "../../forms/tours/useTourForm";
import { useFetchToursCategories } from "../../queries/tours/useFetchToursCategories";
import type { IRequestTours } from "../../interfaces/tours.types";
import {
  ArrowBack,
  CloudUpload,
  Delete,
  LocationOn,
  AttachMoney,
  Image,
  Search,
  Info,
} from "@mui/icons-material";
import Slider from "../../components/PopupModals/Slider";

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

interface IProps {
  open: boolean;
  onClose: () => void;
  editData?: any;
}

export default function AddTour({ open, onClose, editData }: IProps) {
  const { tryAddTours, tryUpdateTour } = useToursApiActions();
  const { data: categories, isLoading: loadingCategories } =
    useFetchToursCategories();
  const [tab, setTab] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [galleryPreview, setGalleryPreview] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(editData, "Edit Data in AddTour");
  const tabLabels = [
    { label: "Basic", icon: <Info sx={{ mr: 1 }} /> },
    { label: "Location", icon: <LocationOn sx={{ mr: 1 }} /> },
    { label: "Pricing", icon: <AttachMoney sx={{ mr: 1 }} /> },
    { label: "Media", icon: <Image sx={{ mr: 1 }} /> },
    { label: "SEO", icon: <Search sx={{ mr: 1 }} /> },
  ];

  async function onSubmit(values: IRequestTours) {
    setIsSubmitting(true);

    const formData: any = new FormData();

    // 👉 AGAR EDIT HAI TO ID BHEJO
    if (editData?.id) {
      formData.append("Id", editData.id);
    }

    formData.append("Title", values.title);
    formData.append("ShortDescription", values.shortDescription);
    formData.append("Description", values.description);

    formData.append("City", values.city);
    formData.append("Country", values.country);
    formData.append("Address", values.address);

    formData.append("Latitude", String(values.latitude));
    formData.append("Longitude", String(values.longitude));

    formData.append("DurationInMinutes", String(values.durationInMinutes));
    formData.append("MinGuests", String(values.minGuests));
    formData.append("MaxGuests", String(values.maxGuests));
    formData.append("PriceFrom", String(values.priceFrom));
    formData.append("Currency", values.currency);

    formData.append("MetaTitle", values.metaTitle);
    formData.append("MetaDescription", values.metaDescription);

    values.categoryIds.forEach((id) => {
      formData.append("CategoryIds", String(id));
    });

    if (uploadedFile) {
      formData.append("CoverImage", uploadedFile);
    }

    galleryFiles.forEach((file) => {
      formData.append("ImageFiles", file);
    });

    try {
      // let response;

      // if (editData?.id) {
      //   // 👉 UPDATE API
      //   response = await tryUpdateTour(formData);
      // } else {
      // 👉 ADD API
      const response = await tryAddTours(formData);
      // }

      if (response.data.success) {
        onClose();
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const initialData = editData
    ? {
        ...emptyTours,
        ...editData,
        categoryIds: editData.categoryIds || [],
      }
    : emptyTours;

  const formik = useTourForm(onSubmit, initialData);

  const { values, handleChange, handleSubmit, setFieldValue, errors, touched } =
    formik;
  React.useEffect(() => {
    if (editData) {
      setFieldValue("title", editData.title);
      setFieldValue("shortDescription", editData.shortDescription);
      setFieldValue("description", editData.description);

      setFieldValue("city", editData.city);
      setFieldValue("country", editData.country);
      setFieldValue("address", editData.address);

      setFieldValue("latitude", editData.latitude);
      setFieldValue("longitude", editData.longitude);

      setFieldValue("durationInMinutes", editData.durationInMinutes);
      setFieldValue("minGuests", editData.minGuests);
      setFieldValue("maxGuests", editData.maxGuests);
      setFieldValue("priceFrom", editData.priceFrom);
      setFieldValue("currency", editData.currency);

      setFieldValue("metaTitle", editData.metaTitle);
      setFieldValue("metaDescription", editData.metaDescription);

      setFieldValue("categoryIds", editData.categoryIds || []);

      // cover image preview
      if (editData.coverImageUrl) {
        setImagePreview(editData.coverImageUrl);
      }

      // gallery preview
      if (editData.imageUrls?.length) {
        setGalleryPreview(editData.imageUrls);
      }
    }
  }, [editData]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const fileArray = Array.from(files);
    setGalleryFiles((prev) => [...prev, ...fileArray]);
    const previews = fileArray.map((file) => URL.createObjectURL(file));
    setGalleryPreview((prev) => [...prev, ...previews]);
  };

  const removeGalleryImage = (index: number) => {
    setGalleryPreview((prev) => prev.filter((_, i) => i !== index));
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeCoverImage = () => {
    setUploadedFile(null);
    setImagePreview(null);
  };

  return (
    <Slider open={open} size="lg" fullWidth onClose={onClose}>
      <Paper
        sx={{
          height: "100vh",
          overflow: "auto",
          borderRadius: 0,
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <Box
          sx={{
            maxWidth: 1200,
            mx: "auto",
            p: { xs: 2, md: 4 },
            height: "100%",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 3,
              p: 3,
              borderRadius: 2,
              bgcolor: "white",
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            }}
          >
            <IconButton
              onClick={onClose}
              sx={{
                mr: 2,
                bgcolor: "primary.light",
                color: "primary.main",
                "&:hover": { bgcolor: "primary.main", color: "white" },
              }}
            >
              <ArrowBack />
            </IconButton>
            <Box>
              <Typography variant="h4" fontWeight={600} color="primary">
                Create New Tour
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fill in the details to create an amazing tour experience
              </Typography>
            </Box>
          </Box>

          {/* Progress Tabs */}
          <Paper
            sx={{
              mb: 4,
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              variant="fullWidth"
              sx={{
                "& .MuiTab-root": {
                  py: 2,
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  borderRight: "1px solid",
                  borderColor: "divider",
                  "&:last-child": { borderRight: "none" },
                },
                "& .Mui-selected": {
                  bgcolor: "primary.main",
                  color: "white !important",
                  borderRadius: 0,
                },
              }}
            >
              {tabLabels.map((tabItem, index) => (
                <Tab
                  key={index}
                  icon={tabItem.icon}
                  iconPosition="start"
                  label={tabItem.label}
                />
              ))}
            </Tabs>
          </Paper>

          <form onSubmit={handleSubmit}>
            <Paper
              sx={{
                p: 4,
                borderRadius: 3,
                bgcolor: "white",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                minHeight: 500,
              }}
            >
              {/* Basic Information */}
              {tab === 0 && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 3,
                  }}
                >
                  <Box sx={{ flex: 2 }}>
                    <Stack spacing={3}>
                      <TextField
                        label="Tour Title"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        error={touched.title && Boolean(errors.title)}
                        helperText={touched.title && errors.title}
                        InputProps={{
                          sx: { borderRadius: 2 },
                        }}
                      />

                      <TextField
                        label="Short Description"
                        name="shortDescription"
                        value={values.shortDescription}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={2}
                        variant="outlined"
                        InputProps={{
                          sx: { borderRadius: 2 },
                        }}
                      />

                      <TextField
                        label="Full Description"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={5}
                        variant="outlined"
                        InputProps={{
                          sx: { borderRadius: 2 },
                        }}
                      />
                    </Stack>
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Paper sx={{ p: 3, borderRadius: 2, bgcolor: "#f8f9fa" }}>
                      <Typography variant="h6" gutterBottom>
                        Categories
                      </Typography>
                      <FormControl fullWidth>
                        <InputLabel>Select Categories</InputLabel>
                        <Select
                          multiple
                          value={values.categoryIds}
                          onChange={(e) =>
                            setFieldValue("categoryIds", e.target.value)
                          }
                          renderValue={(selected) => (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
                              {selected.map((id: number) => {
                                const cat = categories?.data?.find(
                                  (c: any) => c.id === id,
                                );
                                return (
                                  <Chip
                                    key={id}
                                    label={cat?.name || id}
                                    size="small"
                                    color="primary"
                                  />
                                );
                              })}
                            </Box>
                          )}
                          disabled={loadingCategories}
                        >
                          {categories?.data?.map((category: any) => (
                            <MenuItem key={category.id} value={category.id}>
                              {category.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {loadingCategories && (
                          <CircularProgress size={20} sx={{ mt: 1 }} />
                        )}
                      </FormControl>
                    </Paper>
                  </Box>
                </Box>
              )}

              {/* Location */}
              {tab === 1 && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 3,
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Stack spacing={3}>
                      <TextField
                        label="City"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <LocationOn color="action" sx={{ mr: 1 }} />
                          ),
                          sx: { borderRadius: 2 },
                        }}
                      />

                      <TextField
                        label="Country"
                        name="country"
                        value={values.country}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          sx: { borderRadius: 2 },
                        }}
                      />

                      <TextField
                        label="Full Address"
                        name="address"
                        value={values.address}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={2}
                        variant="outlined"
                        InputProps={{
                          sx: { borderRadius: 2 },
                        }}
                      />
                    </Stack>
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Stack spacing={3}>
                      <Alert severity="info" sx={{ borderRadius: 2 }}>
                        Add precise coordinates for better location accuracy
                      </Alert>
                      <TextField
                        type="number"
                        label="Latitude"
                        value={values.latitude}
                        onChange={(e) =>
                          setFieldValue("latitude", +e.target.value)
                        }
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          sx: { borderRadius: 2 },
                        }}
                      />

                      <TextField
                        type="number"
                        label="Longitude"
                        value={values.longitude}
                        onChange={(e) =>
                          setFieldValue("longitude", +e.target.value)
                        }
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          sx: { borderRadius: 2 },
                        }}
                      />
                    </Stack>
                  </Box>
                </Box>
              )}

              {/* Pricing */}
              {tab === 2 && (
                <Box>
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: 3 }}
                  >
                    <Box
                      sx={{
                        flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)" },
                      }}
                    >
                      <TextField
                        type="number"
                        label="Duration (minutes)"
                        value={values.durationInMinutes}
                        onChange={(e) =>
                          setFieldValue("durationInMinutes", +e.target.value)
                        }
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          sx: { borderRadius: 2 },
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)" },
                      }}
                    >
                      <TextField
                        type="number"
                        label="Min Guests"
                        value={values.minGuests}
                        onChange={(e) =>
                          setFieldValue("minGuests", +e.target.value)
                        }
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          sx: { borderRadius: 2 },
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)" },
                      }}
                    >
                      <TextField
                        type="number"
                        label="Max Guests"
                        value={values.maxGuests}
                        onChange={(e) =>
                          setFieldValue("maxGuests", +e.target.value)
                        }
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          sx: { borderRadius: 2 },
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)" },
                      }}
                    >
                      <TextField
                        type="number"
                        label="Price From ($)"
                        value={values.priceFrom}
                        onChange={(e) =>
                          setFieldValue("priceFrom", +e.target.value)
                        }
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          sx: { borderRadius: 2 },
                        }}
                      />
                    </Box>
                  </Box>

                  <Box sx={{ maxWidth: 300 }}>
                    <TextField
                      label="Currency"
                      name="currency"
                      value={values.currency}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <AttachMoney color="action" sx={{ mr: 1 }} />
                        ),
                        sx: { borderRadius: 2 },
                      }}
                    />
                  </Box>
                </Box>
              )}

              {/* Media */}
              {tab === 3 && (
                <Stack spacing={4}>
                  {/* Cover Image */}
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Cover Image
                    </Typography>
                    <Paper
                      sx={{
                        border: "2px dashed",
                        borderColor: "divider",
                        borderRadius: 3,
                        bgcolor: imagePreview ? "transparent" : "#f8f9fa",
                        overflow: "hidden",
                        height: 250,
                      }}
                    >
                      {imagePreview ? (
                        <Box sx={{ position: "relative", height: "100%" }}>
                          <Box
                            component="img"
                            src={imagePreview}
                            sx={{
                              height: "100%",
                              width: "100%",
                              objectFit: "cover",
                            }}
                          />
                          <IconButton
                            onClick={removeCoverImage}
                            sx={{
                              position: "absolute",
                              top: 10,
                              right: 10,
                              bgcolor: "error.main",
                              color: "white",
                              "&:hover": { bgcolor: "error.dark" },
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      ) : (
                        <Button
                          component="label"
                          fullWidth
                          sx={{ height: "100%", flexDirection: "column", p: 3 }}
                        >
                          <CloudUpload
                            sx={{
                              fontSize: 48,
                              mb: 2,
                              color: "text.secondary",
                            }}
                          />
                          <Typography variant="body1" color="text.secondary">
                            Upload Cover Image
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Recommended: 1200x600px
                          </Typography>
                          <input
                            hidden
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                          />
                        </Button>
                      )}
                    </Paper>
                  </Box>

                  {/* Gallery */}
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Gallery Images
                    </Typography>
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<CloudUpload />}
                      sx={{ mb: 3, borderRadius: 2 }}
                    >
                      Upload Multiple Images
                      <input
                        hidden
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleGalleryUpload}
                      />
                    </Button>

                    {galleryPreview.length > 0 && (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                        {galleryPreview.map((src, index) => (
                          <Box
                            key={index}
                            sx={{
                              width: {
                                xs: "calc(50% - 8px)",
                                sm: "calc(33.333% - 10px)",
                                md: "calc(25% - 10px)",
                              },
                              position: "relative",
                            }}
                          >
                            <Paper
                              sx={{
                                borderRadius: 2,
                                overflow: "hidden",
                                height: 140,
                                position: "relative",
                              }}
                            >
                              <Box
                                component="img"
                                src={src}
                                sx={{
                                  height: "100%",
                                  width: "100%",
                                  objectFit: "cover",
                                }}
                              />
                              <IconButton
                                size="small"
                                onClick={() => removeGalleryImage(index)}
                                sx={{
                                  position: "absolute",
                                  top: 8,
                                  right: 8,
                                  bgcolor: "error.main",
                                  color: "white",
                                  "&:hover": { bgcolor: "error.dark" },
                                }}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Paper>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Box>
                </Stack>
              )}

              {/* SEO */}
              {tab === 4 && (
                <Stack spacing={3}>
                  <Alert severity="info" sx={{ borderRadius: 2 }}>
                    Optimize your tour for search engines
                  </Alert>
                  <TextField
                    label="Meta Title"
                    name="metaTitle"
                    value={values.metaTitle}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    helperText="Title displayed in search results (50-60 characters)"
                    InputProps={{
                      sx: { borderRadius: 2 },
                    }}
                  />

                  <TextField
                    label="Meta Description"
                    name="metaDescription"
                    value={values.metaDescription}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    helperText="Brief description for search results (150-160 characters)"
                    InputProps={{
                      sx: { borderRadius: 2 },
                    }}
                  />
                </Stack>
              )}
            </Paper>

            {/* Navigation & Submit */}
            <Box
              sx={{
                mt: 4,
                p: 3,
                borderRadius: 3,
                bgcolor: "white",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "stretch", sm: "center" },
                gap: { xs: 2, sm: 0 },
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              }}
            >
              <Button
                onClick={() => setTab((prev) => Math.max(0, prev - 1))}
                disabled={tab === 0}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  alignSelf: { xs: "stretch", sm: "flex-start" },
                }}
              >
                Previous
              </Button>

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="outlined"
                  onClick={onClose}
                  sx={{ borderRadius: 2, flex: { xs: 1, sm: "none" } }}
                >
                  Cancel
                </Button>

                {tab < 4 ? (
                  <Button
                    onClick={() => setTab((prev) => Math.min(4, prev + 1))}
                    variant="contained"
                    sx={{ borderRadius: 2, px: 4, flex: { xs: 1, sm: "none" } }}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{ borderRadius: 2, px: 4, flex: { xs: 1, sm: "none" } }}
                    startIcon={
                      isSubmitting && (
                        <CircularProgress size={20} color="inherit" />
                      )
                    }
                  >
                    {isSubmitting ? "Creating..." : "Create Tour"}
                  </Button>
                )}
              </Box>
            </Box>
          </form>
        </Box>
      </Paper>
    </Slider>
  );
}
