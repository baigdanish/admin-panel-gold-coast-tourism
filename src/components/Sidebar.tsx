import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Typography,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

import { useNavigate, useLocation } from "react-router-dom";
import AppRoutes from "../routes/appRoutes";

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
  {
    text: "Tour Management",
    icon: <TravelExploreIcon />,
    path: "/tour-management",
  },
  {
    text: "Booking Tracker",
    icon: <ConfirmationNumberIcon />,
    path: AppRoutes.BOOKING_TRACKER,
  },
  {
    text: "Customer Management",
    icon: <PeopleAltIcon />,
    path: AppRoutes.CUSTOMER_MANAGEMENT,
  },
  {
    text: "Voucher Generator",
    icon: <CardGiftcardIcon />,
    path: AppRoutes.VOUCHER_GENERATOR,
  },
  {
    text: "Manual Booking",
    icon: <EventAvailableIcon />,
    path: AppRoutes.MANUAL_BOOKING,
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: any) => location.pathname === path;

  return (
    <Box
      sx={{
        width: "250px",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        backgroundColor: "#ffffff",
        borderRight: "1px solid #eee",
        padding: "16px",
        color: "text.primary",
        marginTop: "20px",
        borderRadius: "20px",
      }}
    >
      {/* Brand */}
      <Box sx={{ p: 2.5, display: "flex", alignItems: "center", gap: 1.2 }}>
        <FlightTakeoffIcon color="primary" />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(90deg, #0ea5e9, #6366f1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Tourism Admin
        </Typography>
      </Box>

      <Divider />

      <List sx={{ px: 1.2, mt: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              selected={isActive(item.path)}
              sx={{
                borderRadius: "12px",
                transition: "all .2s",

                "&.Mui-selected": {
                  background:
                    "linear-gradient(90deg, rgba(14,165,233,.12), rgba(99,102,241,.12))",
                  borderLeft: "4px solid",
                  borderColor: "primary.main",

                  "& .MuiListItemIcon-root": {
                    color: "primary.main",
                  },
                },

                "&:hover": {
                  backgroundColor: "rgba(99,102,241,.06)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 38,
                  color: isActive(item.path)
                    ? "primary.main"
                    : "text.secondary",
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: isActive(item.path) ? 600 : 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Footer */}
      <Box sx={{ mt: "auto", p: 2 }}>
        <Box
          sx={{
            p: 1.6,
            borderRadius: "14px",
            background: "linear-gradient(120deg, #0ea5e9, #6366f1)",
            color: "#fff",
          }}
        >
          <Typography fontSize={13} fontWeight={600}>
            Gold Coast Tours
          </Typography>
          <Typography fontSize={12} sx={{ opacity: 0.85 }}>
            Admin Panel v1.0
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
