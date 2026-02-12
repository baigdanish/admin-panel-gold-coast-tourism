import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Stack,
  IconButton,
  Avatar,
  Badge,
  InputBase,
  Paper,
} from "@mui/material";
import { Notifications, Search } from "@mui/icons-material";

const Navbar = () => {
  return (
    <Box
      sx={{
        height: "70px",
        width: "100%",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #eee",
        padding: "0 20px",
        display: "flex",
        borderRadius: "20px",

        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid #eee",
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #eaeaea",
        }}
      >
        <Toolbar sx={{ height: 72, px: 3 }}>
          {/* Left Section */}
          {/* <Stack direction="row" alignItems="center" spacing={2} flex={1}>
            <IconButton edge="start">
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(90deg, #0ea5e9, #6366f1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Gold Coast Tours Admin
            </Typography>
          </Stack> */}

          {/* Center Search */}
          <Box flex={1} display="flex" justifyContent="center">
            <Paper
              sx={{
                display: "flex",
                alignItems: "center",
                px: 2,
                py: 0.5,
                width: "100%",
                maxWidth: 420,
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            >
              <Search fontSize="small" color="action" />
              <InputBase
                placeholder="Search bookings, tours, customers…"
                sx={{ ml: 1, flex: 1, fontSize: 14 }}
              />
            </Paper>
          </Box>

          {/* Right Section */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            flex={1}
            justifyContent="flex-end"
          >
            <IconButton>
              <Badge badgeContent={3} color="error">
                <Notifications />
              </Badge>
            </IconButton>

            <Stack direction="row" alignItems="center" spacing={1.2}>
              <Avatar
                src="https://i.pravatar.cc/100"
                sx={{ width: 36, height: 36 }}
              />
              <Box>
                <Typography fontSize={14} fontWeight={600}>
                  Admin User
                </Typography>
                <Typography fontSize={12} color="text.secondary">
                  Manager
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
