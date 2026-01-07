import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PlaceIcon from "@mui/icons-material/Place";
import HotelIcon from "@mui/icons-material/Hotel";
import EventIcon from "@mui/icons-material/Event";
import { useNavigate, useLocation } from "react-router-dom";
import AppRoutes from "../routes/appRoutes";

const menuItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/",
  },
  {
    text: "Tour Management",
    icon: <PlaceIcon />,
    path: "/tour-management",
  },
  {
    text: "BookingTracker",
    icon: <HotelIcon />,
    path: AppRoutes.BOOKING_TRACKER,
  },
  {
    text: "Customer Management",
    icon: <EventIcon />,
    path: AppRoutes.CUSTOMER_MANAGEMENT,
  },
  {
    text: "Voucher Generator",
    icon: <EventIcon />,
    path: AppRoutes.VOUCHER_GENERATOR,
  },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

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
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.path)}
              selected={isActive(item.path)}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "primary.light",
                  "&:hover": {
                    backgroundColor: "primary.light",
                  },
                },
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive(item.path) ? "primary.main" : "inherit",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: isActive(item.path) ? "bold" : "normal",
                  color: isActive(item.path) ? "primary.main" : "inherit",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;
