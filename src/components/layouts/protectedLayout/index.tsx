import { Box, Grid, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Sidebar";
import Navbar from "../../Navbar";

const ProtectedRoute = () => {
  return (
    <Stack sx={{ padding: "20px" }}>
      <Sidebar />
      <Stack
        gap="30px"
        sx={{
          position: "relative",
          marginLeft: { lg: "250px" },
          paddingBottom: "3rem",
          maxwidth: "100%",
        }}
      >
        <Grid
          container
          spacing="20px"
          sx={{
            margin: "0 20px",
            maxWidth: "calc(100% - 20px)",
            width: "100%",
          }}
        >
          <Navbar />
          <Box
            component="main"
            sx={{
              width: "100%",

              borderRadius: "20px",
              padding: "10px",
            }}
          >
            <Outlet />
          </Box>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default ProtectedRoute;
